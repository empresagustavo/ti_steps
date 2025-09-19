import { randomUUID } from "crypto";
import { AuthModel } from "../models/auth.model";
import { UserModel } from "../models/user.model";
import { validatePassword } from "../utils/crypt.util";
import userService from "./user.service";
import { UnauthorizedError } from "../errors/http.error";



const authentication = async (model: AuthModel): Promise<UserModel> => {
    
    const user = await userService.getByEmail(model.email);
    if(!await validatePassword(model.password, user.password!)) throw new UnauthorizedError("Usuário e/ou senha inválido(s).");

    user.token = randomUUID();
    user.password = undefined;

    return user;
}

export default {
    authentication,
}