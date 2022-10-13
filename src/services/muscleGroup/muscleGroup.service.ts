import { MuscleGroupModel, IMuscleGroup } from "../../models/muscleGroup.model";

export async function create({ name }: IMuscleGroup): Promise<IMuscleGroup> {
    const doc = new MuscleGroupModel({ name });
    await doc.save();
    return doc;
}
