import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

// Rotas de Usuário
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.remove);

export default router;
