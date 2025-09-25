import { Router } from "express";
import notificationController from "../../controllers/notification.controller";

const notificationRoute = Router();

// Rotas de Menus
notificationRoute.get("/notifications", notificationController.getAll);
notificationRoute.get("/notifications/:id", notificationController.getById);
notificationRoute.post("/notifications", notificationController.create);
notificationRoute.put("/notifications/:id", notificationController.update);
notificationRoute.delete("/notifications/:id", notificationController.remove);

export default notificationRoute;