import { RequestWithUser } from "./../../helpers/jwt";
import * as userService from "../../services/users/user.service";
import { Request, Response } from "express";
import { ErrorModel } from "../../helpers/errors";
import { Service } from "typedi";
import { Controller, Post, Res, Req, Get, UseBefore } from "routing-controllers";
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
                    username: user.username,
                    userType: user.userType,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    document: user.document,
                    plans: user.plans,
                },
            });
        } catch (error) {
            return new ErrorModel().newBadRequest("Parámetros Inválidos").send(res);
        }
    }

    @Get()
    async getUsers(@Req() req: Request, @Res() res: Response) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    @Get("/me")
    @UseBefore(authorize([UserType.ADMINISTRADOR]))
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
