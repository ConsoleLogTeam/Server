import mongoose, { Schema } from "mongoose";
import { IPlanDetails } from "./planDetail.model";

export interface IPlan {
    name: string;
    days: number;
    planDetails?: string[] | IPlanDetails[];
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        days: { type: Number, required: true },
        planDetails: [{ type: Schema.Types.ObjectId, ref: "PlanDetail", default: [] }],
    },
    { collection: "Plans" }
);

export const PlanModel = mongoose.model<IPlan>("Plan", schema);
