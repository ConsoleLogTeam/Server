import { IPlan } from "./plan.model";
import mongoose, { Schema } from "mongoose";
import { DocType, UserType } from "../helpers/constants";

export interface IUser {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    userType: UserType;
    docType: DocType;
    username: string;
    password: string;
    document: string;
    plans: string[] | IPlan[];
    country: string;
    province: string;
    locality: string;
    address: string;
    remainingClasses: number;
}

const User = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        phone: { type: String, default: "" },
        email: { type: String, required: true, unique: true },
        userType: { type: String, enum: Object.values(UserType), required: true },
        docType: { type: String, enum: Object.values(DocType) },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        document: { type: String, required: true, unique: true },
        plans: [{ type: Schema.Types.ObjectId, ref: "Plan", default: [] }],
        country: { type: Schema.Types.ObjectId, ref: "Country", default: {} },
        province: { type: Schema.Types.ObjectId, ref: "Province", default: {} },
        locality: { type: Schema.Types.ObjectId, ref: "Locality", default: {} },
        address: { type: String },
        remainingClasses: { type: Number, default: 0 },
    },
    { collection: "Users", timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", User);
