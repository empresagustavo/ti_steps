import { Router } from "express";
import snackController from "../../controllers/snack.controller";

const snackRoute = Router();

snackRoute.get("/snacks", snackController.getAll);
snackRoute.get("/snacks/stats", snackController.getAllStats);
snackRoute.get("/snacks/:id", snackController.getById);
snackRoute.post("/snacks", snackController.create);
snackRoute.put("/snacks/:id", snackController.update);
snackRoute.delete("/snacks/:id", snackController.remove);

export default snackRoute;