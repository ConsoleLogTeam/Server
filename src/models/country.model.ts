import mongoose from "mongoose";
import { CountryCode } from "../helpers/constants";

export interface ICountry {}

const schema = new mongoose.Schema(
    {
        isoCode: { type: String, enum: Object.values(CountryCode), required: true },
        name: { type: String, required: true },
        flagImage: { type: String, required: true },
    },
    { collection: "Countries", timestamps: true }
);

export const CountryModel = mongoose.model<ICountry>("Country", schema);
