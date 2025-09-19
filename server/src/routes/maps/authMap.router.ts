import { Router } from "express";
import authController from "../../controllers/auth.controller";

const authRoute = Router();

// Rotas de Autenticação
authRoute.post("/auth", authController.login);

export default authRoute;