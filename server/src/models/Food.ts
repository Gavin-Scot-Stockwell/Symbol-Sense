import { Schema, model, Document } from 'mongoose';

interface IFood extends Document {
    foodText: string;
    foodDescription: string;
    foodAuthor: Schema.Types.ObjectId;
    createdAt: Date;
}

const FoodSchema = new Schema({
    foodText: { type: String, required: true },
    foodDescription: { type: String, required: true },
    foodAuthor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Food = model<IFood>('Food', FoodSchema);

export default Food;