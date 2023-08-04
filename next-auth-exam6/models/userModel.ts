import { Model, Schema, model, models } from "mongoose";

export interface IUser {
    _id: string;
    name: string,
    email: string;
    password: string;
    image: string;
    role: string;
    provider: string;
}

interface IUserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, IUserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    image: String,
    role: { type: String, default: 'user' },
    provider: { type: String, default: 'credentials' }
}, {timestamps: true});

const User = models.User || model<IUser, IUserModel>('User', userSchema);

export default User;


