import { Emoji, User } from '../models/index.js'
import { signToken, AuthenticationError } from '../utils/auth.js';

interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}

interface LoginUserArgs {
    email: string;
    password: string;
}

interface UserArgs {
    username: string;
}

interface EmojiArgs {
    emojiId: string;
    emojiAuthor: string,
}

interface AddEmojiArgs {
    input: {
        emojiText: string;
        emojiDescription: string;
        emojiAuthor: string;
    }
}

interface UpdateEmojiArgs {
    input: {
        emojiId: string;
        emojiText: string;
        emojiDescription: string;
        emojiAuthor: string;
    }
}


interface RemoveEmojiArgs {
    emojiId: string;
    emojiDescription: string;
    emojiAuthor: string;
}

const resolvers = {
    Query: {
        users: async () => {
            const userReturn = await User.find().populate('emojis');
            return userReturn;
        },
        user: async (_parent: any, { username }: UserArgs) => {
            const userReturn = await User.findOne({ username, Emoji }).populate({
                path: 'emojis',
                model: 'Emoji' // Explicitly reference the model name
            });
            return userReturn;
        },
        emojis: async () => {
            return await Emoji.find().sort({ createdAt: -1 });
        },
        emoji: async (_parent: any, { emojiId }: EmojiArgs) => {

            let emojiIdReturn = await Emoji.findOne({ _id: emojiId });

            return emojiIdReturn
        },
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('emojis');
            }
            throw new AuthenticationError('Could not authenticate user.');
        },
        randomEmoji: async () => {
            const randomEmoji = await Emoji.aggregate([{ $sample: { size: 1 } }]);
            return randomEmoji[0] || null; // Return the first (and only) random emoji, or null if none found
        },
        lastEmoji: async () => {
            const lastEmoji = await Emoji.findOne().sort({ createdAt: -1 }); // Sort by createdAt in descending order
            return lastEmoji || null; // Return the last emoji or null if none exists
        },
    },
    Mutation: {
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            // Create a new user with the provided username, email, and password
            const user = await User.create({ ...input });

            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);

            // Return the token and the user
            return { token, user };
        },

        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });

            // If no user is found, throw an AuthenticationError
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);

            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);

            // Return the token and the user
            return { token, user };
        },
        addEmoji: async (_parent: any, { input }: AddEmojiArgs, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            try {
                // Create emoji and associate it with the logged-in user
                const emoji = await Emoji.create({
                    ...input,
                    emojiAuthor: context.user._id,
                });

                // Update user with new emoji reference
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { emojis: emoji._id } },
                    { new: true }
                ).populate('emojis');

                if (!updatedUser) {
                    throw new Error('User not found');
                }

                //console.log("Updated user with populated emojis:", JSON.stringify(updatedUser, null, 2));

                return updatedUser;
            } catch (error) {
                console.error("Error adding emoji:", error);
                throw new Error("Failed to add emoji");
            }
        },


        removeEmoji: async (_parent: any, { emojiId }: RemoveEmojiArgs, context: any) => {
            if (context.user) {
                // Find and delete the Emoji document where emojiAuthor matches the user's ObjectId
                const emoji = await Emoji.findOneAndDelete({
                    _id: emojiId,
                    emojiAuthor: context.user._id, // Use the user's ObjectId
                });

                // If no matching Emoji document is found, throw an error
                if (!emoji) {
                    throw new AuthenticationError('Emoji not found or you are not authorized to delete it.');
                }

                // Remove the reference to the deleted Emoji from the User's emojis array
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { emojis: emojiId } }
                );

                return emoji;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        updateEmoji: async (_parent: any, { input }: UpdateEmojiArgs, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            try {
                // Create emoji and associate it with the logged-in user

                // Update user with new emoji reference
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { emojis: Emoji } },
                    { new: true }
                ).populate('emojis');

                if (!updatedUser) {
                    throw new Error('User not found');
                }

                //console.log("Updated user with populated emojis:", JSON.stringify(updatedUser, null, 2));

                return updatedUser;
            } catch (error) {
                console.error("Error adding emoji:", error);
                throw new Error("Failed to add emoji");
            }
        },

    },


}

export default resolvers;