import { Controller, Req, Res, Get } from "routing-controllers";
import { Service } from "typedi";
import { Response, Request } from "express";
import * as provinceServices from "../../services/province/province.service";
import { getProvincesQuerySchema } from "../../utils/validations/getProvincesQuery.schema";

@Controller("/provinces")
@Service()
export default class ProvinceController {
    @Get()
    async getProvinces(@Req() req: Request, @Res() res: Response) {
        try {
            const { name } = await getProvincesQuerySchema.parseAsync(req.query);
            const provinces = await provinceServices.getAll(name);
            return res.status(200).json(provinces);
        } catch (error) {
            console.log(error);
        }
    }
}
