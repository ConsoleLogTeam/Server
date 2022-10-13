import { ExerciseModel, IExercise } from "../../models/exercise.model";

export async function create(exercise: IExercise): Promise<IExercise> {
    const doc = new ExerciseModel({
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
    });
    await doc.save();
    return doc;
}
