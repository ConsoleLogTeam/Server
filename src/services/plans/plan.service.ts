import { IPlan, PlanModel } from "../../models/plan.model";

export async function createPlan({ name, days, planDetails }: IPlan): Promise<IPlan> {
    const Doc = new PlanModel({ name, days, planDetails });
    await Doc.save();
    return Doc;
}

export async function getPlans() {
    const plans = await PlanModel.find().populate({
        path: "planDetails",
        populate: {
            path: "exercise",
            populate: "muscleGroup",
        },
    });
    return plans;
}

export async function getPlanById(id: string) {
    const plan = await PlanModel.findById(id).populate({
        path: "planDetails",
        populate: {
            path: "exercise",
            populate: "muscleGroup",
        },
    });
    return plan;
}
