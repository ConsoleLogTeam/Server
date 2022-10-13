import { IPlan } from "./plan.model";
import mongoose, { Schema } from "mongoose";
import { UserType } from "../helpers/constants";

export interface IUser {
    username: string;
    userType: UserType;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    document: string;
    plans: string[] | IPlan[];
}

const User = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        userType: { type: String, enum: Object.values(UserType), required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, default: "" },
        document: { type: String, required: true, unique: true },
        plans: [{ type: Schema.Types.ObjectId, ref: "Plan", default: [] }],
    },
    { collection: "Users" }
);

export const UserModel = mongoose.model<IUser>("User", User);
