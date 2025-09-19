import { Request, Response } from "express";
import { AuthModel } from "../models/auth.model";
import authService from "../services/auth.service";





const login = async (req: Request, res: Response) => {

    console.log(req.body)
    const { email, password } = req.body as AuthModel;

    const user = await authService.authentication({ email, password });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    
    res.json(user);
};


export default {
    login,
}