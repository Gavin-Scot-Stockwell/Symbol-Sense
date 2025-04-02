import { Schema, model, Document } from 'mongoose';
import bcyrpt from 'bcrypt';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    emojis: Schema.Types.ObjectId[];
    isCorrectPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    emojis: [{ type: Schema.Types.ObjectId, ref: 'Emoji' }],
},
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
        strictPopulate: false //just to test
    }
);

UserSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcyrpt.compare(password, this.password);
};

UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcyrpt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcyrpt.compare(password, this.password);
};

const User = model<IUser>('User', UserSchema);

export default User;