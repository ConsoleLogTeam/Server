import mongoose from "mongoose";

export interface IMuscleGroup {
    name: string;
}

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { collection: "MuscleGroup" }
);

export const MuscleGroupModel = mongoose.model<IMuscleGroup>("MuscleGroup", schema);
