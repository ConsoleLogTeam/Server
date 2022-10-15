import { getLocalitiesQuerySchema } from "./../../utils/validations/getLocalitiesQuery.schema";
import { Controller, Get, Res, Req } from "routing-controllers";
import { Service } from "typedi";
import { Request, Response } from "express";
import * as localityService from "../../services/locality/locality.service";
@Controller("/localities")
@Service()
export default class LocalityController {
    @Get()
    async getLocalities(@Req() req: Request, @Res() res: Response) {
        try {
            const { name, province } = await getLocalitiesQuerySchema.parseAsync(req.query);
            const localities = await localityService.getAll(name, province);
            return res.status(200).json(localities);
        } catch (error) {
            console.log(error);
        }
    }
}
