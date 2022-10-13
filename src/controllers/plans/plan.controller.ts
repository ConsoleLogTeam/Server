import { Response, Request } from "express";
import { Controller, Get, Post, Req, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { authorize } from "../../middlewares/auth";
import * as planService from "../../services/plans/plan.service";
import { planSchema } from "../../utils/validations/plan.schema";

@Controller("/plans")
@Service()
export default class PlansController {
    @Post()
    @UseBefore(authorize([]))
    async createPlan(@Res() res: Response, @Req() req: Request) {
        try {
            const bodyPlan = await planSchema.parseAsync(req.body);
            const plan = await planService.createPlan(bodyPlan);
            return res.status(200).json({ message: "Plan Creado", plan });
        } catch (error) {
            console.log(error);
        }
    }

    // @UseBefore(authorize([]))
    @Get()
    async getPlans(@Res() res: Response, @Req() req: Request) {
        try {
            const plans = await planService.getPlans();
            return res.status(200).json(plans);
        } catch (error) {
            console.log(error);
        }
    }

    @Get("/:id")
    async getPlanById(@Req() req: Request, @Res() res: Response) {
        const {
            params: { id },
        } = req;
        try {
            const plan = await planService.getPlanById(id);
            return res.status(200).json(plan);
        } catch (error) {
            console.log(error);
        }
    }
}
