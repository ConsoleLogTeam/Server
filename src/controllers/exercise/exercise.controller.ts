import { Controller, Post, Req, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { Request, Response } from "express";
import * as exerciseService from "../../services/exercise/exercise.service";
import { exerciseSchema } from "../../utils/validations/exercise.schema";
import { authorize } from "../../middlewares/auth";
@Controller("/exercise")
@Service()
export default class ExerciseController {
    @Post()
    async createExercise(@Res() res: Response, @Req() req: Request) {
        try {
            const exerciseBody = await exerciseSchema.parseAsync(req.body);
            const exercise = await exerciseService.create(exerciseBody);
            return res.status(200).json({ message: "Ejercicio Creado", exercise });
        } catch (error) {}
    }
}
