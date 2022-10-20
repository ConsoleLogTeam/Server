import { getCountriesQuerySchema } from "../../utils/validations/getCountriesQuery.schema";
import { Controller, Get, Res, Req, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { UserType } from "../../helpers/constants";
import { authorize } from "../../middlewares/auth";
import * as countryService from "../../services/country/country.service";
import { Request, Response } from "express";
@Controller("/countries")
@Service()
export default class CountryController {
    @Get()
    async getCountries(@Req() req: Request, @Res() res: Response) {
        try {
            const { name } = await getCountriesQuerySchema.parseAsync(req.query);
            const countries = await countryService.getAll(name);

            return res.status(200).json(countries);
        } catch (error) {
            console.log(error);
        }
    }
}
