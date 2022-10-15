import mongoose, { Schema } from "mongoose";
import { ICountry } from "./country.model";

export interface IProvince {
    name: string;
    country: string | ICountry;
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        country: {
            type: Schema.Types.ObjectId,
            ref: "Country",
            required: true,
        },
    },
    { collection: "Provinces", timestamps: true }
);

export const ProvinceModel = mongoose.model<IProvince>("Province", schema);
