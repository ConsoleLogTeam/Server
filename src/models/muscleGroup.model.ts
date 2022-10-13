import mongoose from "mongoose";

export interface IMuscleGroup {
    name: string;
}

const MuscleGroup = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { collection: "MuscleGroup" }
);

export const MuscleGroupModel = mongoose.model<IMuscleGroup>("MuscleGroup", MuscleGroup);
