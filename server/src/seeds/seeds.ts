import db from '../config/connection.js';
import { Emoji, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json';
import emojiData from './emojiData.json';

const seedDatabase = async (): Promise<void> => {
    try {
        await db();
        await cleanDB();

        // Create users
        const users = await User.create(userData);

        // Create emojis and associate them with users
        const emojisWithUserIds = emojiData.map((emoji) => {
            const user = users.find((user) => user.username === emoji.emojiAuthor);
            if (!user) {
                console.log(`User with username ${emoji.emojiAuthor} not found. Skipping emoji item.`);
                return null;
            }

            return {
                emojiText: emoji.emojiText,
                emojiAuthor: user._id,
                emojiDescription: emoji.emojiDescription,
            };
        }).filter(Boolean);

        const emojis = await Emoji.insertMany(emojisWithUserIds);

        // Update users with their associated emojis
        for (const emoji of emojis) {
            await User.findByIdAndUpdate(
                emoji.emojiAuthor,
                { $push: { emojis: emoji._id } },
                { new: true }
            );
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();