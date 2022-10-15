import mongoose, { Schema } from "mongoose";
import { IMuscleGroup } from "./muscleGroup.model";

export interface IExercise {
    name: string;
    muscleGroup: string | IMuscleGroup;
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        muscleGroup: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "MuscleGroup",
        },
    },
    { collection: "Exercises" }
);

export const ExerciseModel = mongoose.model<IExercise>("Exercise", schema);
