import db from '../config/connection.js';
import { Food, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json' with { type: 'json' };
import foodData from './foodData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
    try {
        await db();
        await cleanDB();

        const users = await User.create(userData);

        const foodsWithUserIds = foodData.map((food) => {
            const user = users.find((user) => user.username === food.foodAuthor);
            if (!user) {
                console.log(`User with username ${food.foodAuthor} not found. Skipping food item.`);
                return null;
            }

            if (user.foods === undefined) {
                console.log('user.foods is undefined');
            } else {
                console.log(user.foods + 'user.foods is defined');
            }



            return {
                foodText: food.foodText,
                foodAuthor: user._id,
                foodDescription: food.foodDescription

            };
        }).filter(Boolean);

        // Insert the food data with the correct foodAuthor references
        await Food.insertMany(foodsWithUserIds);
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
