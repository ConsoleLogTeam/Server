import mongoose, { Schema } from "mongoose";
import { IExercise } from "./exercise.model";

export interface IPlanDetails {
    exercise: string | IExercise;
    series: number;
    repetitions: number;
    observations: string;
}

const schema = new mongoose.Schema(
    {
        exercise: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Exercise",
        },
        series: { type: Number, required: true },
        repetitions: { type: Number, required: true },
        observations: { type: String, default: "" },
    },
    { collection: "PlanDetails" }
);

export const PlanDetailModel = mongoose.model<IPlanDetails>("PlanDetail", schema);
