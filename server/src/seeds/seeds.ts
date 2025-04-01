import db from '../config/connection.js';
import { Emoji, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json' with { type: 'json' };
import emojiData from './EmojiData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
    try {
        await db();
        await cleanDB();

        const users = await User.create(userData);

        const emojisWithUserIds = emojiData.map((emoji) => {
            const user = users.find((user) => user.username === emoji.emojiAuthor);
            if (!user) {
                console.log(`User with username ${emoji.emojiAuthor} not found. Skipping emoji item.`);
                return null;
            }

            return {
                emojiText: emoji.emojiText,
                emojiAuthor: user._id,
                emojiDescription: emoji.emojiDescription
            };
        }).filter(Boolean);

        // Insert the emoji data with the correct emojiAuthor references
        await Emoji.insertMany(emojisWithUserIds);
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();