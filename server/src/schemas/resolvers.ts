import { Food, User } from '../models/index.js'
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

interface FoodArgs {
    foodId: string;
    foodAuthor: string,
}

interface AddFoodArgs {
    input: {
        foodText: string;
        foodDescription: string;
        foodAuthor: string;
    }
}

interface RemoveFoodArgs {
    foodId: string;
    foodDescription: string;
    foodAuthor: string;
}

const resolvers = {
    Query: {
        users: async () => {
            const userReturn = await User.find().populate('foods');
            return userReturn;
        },
        user: async (_parent: any, { username }: UserArgs) => {
            const userReturn = await User.findOne({ username, Food }).populate({
                path: 'foods',
                model: 'Food' // Explicitly reference the model name
            });
            return userReturn;
        },
        foods: async () => {
            return await Food.find().sort({ createdAt: -1 });
        },
        food: async (_parent: any, { foodId }: FoodArgs) => {

            let foodIdReturn = await Food.findOne({ _id: foodId });

            return foodIdReturn
        },
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('foods');
            }
            throw new AuthenticationError('Could not authenticate user.');
        },
        randomFood: async () => {
            const randomFood = await Food.aggregate([{ $sample: { size: 1 } }]);
            return randomFood[0] || null; // Return the first (and only) random food, or null if none found
        },
        lastFood: async () => {
            const lastFood = await Food.findOne().sort({ createdAt: -1 }); // Sort by createdAt in descending order
            return lastFood || null; // Return the last food or null if none exists
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
        addFood: async (_parent: any, { input }: AddFoodArgs, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            try {
                // Create food and associate it with the logged-in user
                const food = await Food.create({
                    ...input,
                    foodAuthor: context.user._id,
                });

                // Update user with new food reference
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { foods: food._id } },
                    { new: true }
                ).populate('foods');

                if (!updatedUser) {
                    throw new Error('User not found');
                }

                //console.log("Updated user with populated foods:", JSON.stringify(updatedUser, null, 2));

                return updatedUser;
            } catch (error) {
                console.error("Error adding food:", error);
                throw new Error("Failed to add food");
            }
        },


        removeFood: async (_parent: any, { foodId }: RemoveFoodArgs, context: any) => {
            if (context.user) {
                // Find and delete the Food document where foodAuthor matches the user's ObjectId
                const food = await Food.findOneAndDelete({
                    _id: foodId,
                    foodAuthor: context.user._id, // Use the user's ObjectId
                });

                // If no matching Food document is found, throw an error
                if (!food) {
                    throw new AuthenticationError('Food not found or you are not authorized to delete it.');
                }

                // Remove the reference to the deleted Food from the User's foods array
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { foods: foodId } }
                );

                return food;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

    },


}





export default resolvers;
