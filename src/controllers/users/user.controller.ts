import { getUsersQuerySchema } from "./../../utils/validations/getUsersQuery.schema";
import { RequestWithUser } from "./../../helpers/jwt";
import * as userService from "../../services/users/user.service";
import { Request, Response } from "express";
import { ErrorModel } from "../../helpers/errors";
import { Service } from "typedi";
import { Controller, Post, Res, Req, Get, UseBefore, Authorized } from "routing-controllers";
import { userSchema } from "../../utils/validations/user.schema";
import { authorize } from "../../middlewares/auth";
import { UserType } from "../../helpers/constants";

@Controller("/users")
@Service()
export default class UserController {
    @Post("/login")
    async login(@Req() req: Request, @Res() res: Response) {
        const {
            body: { email, password },
        } = req;

        try {
            const user = await userService.authenticate({ email, password });
            return res.status(200).json({ user });
        } catch (error) {
            console.log(error);
            return new ErrorModel().newBadRequest("Email o contraseña ingresados son incorrectos").send(res);
        }
    }

    @Post("/register")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.PROFESOR]))
    async register(@Req() req: Request, @Res() res: Response) {
        try {
            const userBody = await userSchema.parseAsync(req.body);
            const user = await userService.register(userBody);

            return res.status(200).json({
                message: "Usuario Registrado",
                user: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                    email: user.email,
                    userType: user.userType,
                    docType: user.docType,
                    username: user.username,
                    document: user.document,
                    plans: user.plans,
                    country: user.country,
                    province: user.province,
                    locality: user.locality,
                    address: user.address,
                },
            });
        } catch (error) {
            return new ErrorModel().newBadRequest("Parámetros Inválidos").send(res);
        }
    }

    @Get()
    @UseBefore(authorize([UserType.ADMINISTRADOR]))
    async getUsers(@Req() req: Request, @Res() res: Response) {
        try {
            const { firstname, document } = await getUsersQuerySchema.parseAsync(req.query);
            const users = await userService.getUsers(document, firstname);
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    @Get("/authcheck")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ALUMNO, UserType.PROFESOR]))
    async getAuthCheck(@Req() req: Request, @Res() res: Response) {
        try {
            console.log("asd");
            return res.status(200).json(true);
        } catch (error) {
            console.log(error);
        }
    }

    @Get("/me")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ALUMNO, UserType.PROFESOR]))
    async getMe(@Req() req: RequestWithUser, @Res() res: Response) {
        const {
            user: { sub },
        } = req;
        try {
            const user = await userService.getUserById(sub);
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    }

    @Get("/:id")
    async getUserById(@Req() req: Request, @Res() res: Response) {
        const {
            params: { id },
        } = req;
        try {
            const user = await userService.getUserById(id);
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    }
}
