import { Request, Response, NextFunction } from "express";
import { validateToken } from "../helpers/jwt";
import { ErrorModel } from "../helpers/errors";
import { UserType } from "../helpers/constants";
import { Req } from "routing-controllers";
export const authorize =
    (allowedAccessTypes: UserType[]) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            let jwt = req.headers.authorization;

            // verify request has token
            if (!jwt) {
                return new ErrorModel().newUnauthorized("Invalid token").send(res);
            }

            // remove Bearer if using Bearer Authorization mechanism
            if (jwt.toLowerCase().startsWith("bearer")) {
                jwt = jwt.slice("bearer".length).trim();
            }

            // verify token hasn't expired yet
            const decodedToken = await validateToken(jwt);

            const hasAccessToEndpoint = allowedAccessTypes.some((access) => access === decodedToken.userType);

            if (!hasAccessToEndpoint) {
                return new ErrorModel().newForbidden("El usuario no posee suficientes privilegios").send(res);
            }

            req.user = decodedToken;

            next();
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
            }

            return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
        }
    };
