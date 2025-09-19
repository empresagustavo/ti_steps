import { Router } from "express";
import userController from "../../controllers/user.controller";

const userRoute = Router();

// Rotas de Usuário
userRoute.get("/users", userController.getAll);
userRoute.get("/users/:id", userController.getById);
userRoute.post("/users", userController.create);
userRoute.put("/users/:id", userController.update);
userRoute.delete("/users/:id", userController.remove);

export default userRoute;