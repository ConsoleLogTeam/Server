import { IExercise } from "./../../models/exercise.model";
import { IPlanDetails, PlanDetailModel } from "../../models/planDetail.model";

export async function create({ exercise, series, repetitions, observations }: IPlanDetails): Promise<IPlanDetails> {
    const Doc = new PlanDetailModel({
        exercise,
        series,
        repetitions,
        observations,
    });
    await Doc.save();
    return Doc;
}
