import { Controller, Post, Req, Res } from "routing-controllers";
import { Service } from "typedi";
import { Request, Response } from "express";
import * as planDetailService from "../../services/planDetails/planDetails.service";
import { planDetailSchema } from "../../utils/validations/planDetail.schema";

@Controller("/planDetails")
@Service()
export default class PlanDetailsController {
    @Post()
    async createPlanDetail(@Req() req: Request, @Res() res: Response) {
        try {
            const planDetailBody = await planDetailSchema.parseAsync(req.body);
            const planDetail = await planDetailService.create(planDetailBody);
            return res.status(200).json({ message: "Detalle de Plan Creado", planDetail });
        } catch (error) {
            console.log(error);
        }
    }
}
