import { getUsersQuerySchema } from "./../../utils/validations/getUsersQuery.schema";
import { RequestWithUser } from "./../../helpers/jwt";
import * as userService from "../../services/users/user.service";
import { Request, Response } from "express";
import { ErrorModel } from "../../helpers/errors";
import { Service } from "typedi";
import { Controller, Post, Res, Req, Get, UseBefore, Put, Patch } from "routing-controllers";
import { userSchema } from "../../utils/validations/user.schema";
import { authorize } from "../../middlewares/auth";
import { UserType } from "../../helpers/constants";

@Controller("/users")
@Service()
export default class UserController {

    @Get("/test")
    
    async test(@Req() req: Request, @Res() res: Response) {
        try {
            
            return res.status(200).json("anda");
        } catch (error) {
            console.log(error);
        }
    }

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
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ENTRENADOR]))
    async register(@Req() req: Request, @Res() res: Response) {
        try {
            const userBody = await userSchema.parseAsync(req.body);
            const user = await userService.register(userBody);

            return res.status(200).json({
                message: "Usuario Registrado",
                user: {
                    _id: user._id,
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
                    birthdate: user.birthdate,
                    profilephoto: user.profilephoto,
                    address: user.address,
                    remainingClasses: user.remainingClasses,
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
            const { itemsPerPage, cursor } = await getUsersQuerySchema.parseAsync(req.query);
            const nroItemsPerPage = itemsPerPage !== undefined ? parseInt(itemsPerPage) : undefined;
            const users = await userService.getUsers(nroItemsPerPage, cursor);
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    @Get("/authcheck")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ALUMNO, UserType.ENTRENADOR]))
    async getAuthCheck(@Req() req: Request, @Res() res: Response) {
        try {
            return res.status(200).json(true);
        } catch (error) {
            console.log(error);
        }
    }

    @Get("/me")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ALUMNO, UserType.ENTRENADOR]))
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

    @Get("/document/:document")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ENTRENADOR]))
    async getUserByDocument(@Req() req: Request, @Res() res: Response) {
        const {
            params: { document },
        } = req;
        try {
            const user = await userService.getUserByDocument(document);
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    }
    @Get("/:id")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ENTRENADOR]))
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
    @Patch("/:id")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ENTRENADOR]))
    async updateUserById(@Req() req: Request, @Res() res: Response) {
        const {
            params: { id },
            body: user,
        } = req;
        try {
            const response = await userService.updateUserById(id, user);
            if (response === null) {
                throw new Error("Usuario no encontrado");
            }
            const { password, ...rest } = response;
            return res.status(200).json({ message: "Usuario Actualizado", user: rest });
        } catch (error) {
            console.log(error);
        }
    }

    @Post("/decrement/:document")
    @UseBefore(authorize([UserType.ADMINISTRADOR, UserType.ENTRENADOR]))
    async decrementRemainingClasses(@Req() req: Request, @Res() res: Response) {
        const {
            params: { document },
        } = req;

        try {
            const user = await userService.getUserByDocument(document);
            if (user === null) {
                throw new Error("Usuario no encontrado");
            }
            if (user?.remainingClasses === 0) {
                throw new Error("El usuario no tiene mas clases disponibles");
            }

            const response = await userService.decrementRemainingClasses(document, 1);
            if (response === null) {
                throw new Error("Error");
            }
            const { password, ...rest } = response;
            return res.status(200).json({ message: "Asistencia Registrada", user: rest });
        } catch (error) {
            console.log(error);
        }
    }
}
