import { Router } from "express";
import triggerController from "../../controllers/trigger.controller";

const triggerRoute = Router();

// Rotas de Menus
triggerRoute.get("/triggers", triggerController.getAll);
triggerRoute.get("/triggers/:id", triggerController.getById);
triggerRoute.post("/triggers", triggerController.create);
triggerRoute.put("/triggers/:id", triggerController.update);
triggerRoute.delete("/triggers/:id", triggerController.remove);
triggerRoute.post("/triggers/vote", triggerController.vote);

export default triggerRoute;