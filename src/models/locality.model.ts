import mongoose, { Schema } from "mongoose";
import { IProvince } from "./province.model";

export interface ILocality {
    name: string;
    province: string | IProvince;
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        province: { type: Schema.Types.ObjectId, ref: "Province", required: true },
    },
    { collection: "Localities", timestamps: true }
);

export const LocalityModel = mongoose.model<ILocality>("Locality", schema);
