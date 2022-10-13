import { Controller, Req, Res, Post } from "routing-controllers";
import { Service } from "typedi";
import { Response, Request } from "express";
import * as muscleGroupService from "../../services/muscleGroup/muscleGroup.service";
import { muscleGroupSchema } from "../../utils/validations/muscleGroup.schema";

@Controller("/muscleGroup")
@Service()
export default class MuscleGroupController {
    @Post()
    async createMuscleGroup(@Req() req: Request, @Res() res: Response) {
        try {
            const muscleGroupBody = await muscleGroupSchema.parseAsync(req.body);
            const muscleGroup = await muscleGroupService.create(muscleGroupBody);
            return res.status(200).json({ message: "Grupo Muscular Creado", muscleGroup });
        } catch (error) {}
    }
}
