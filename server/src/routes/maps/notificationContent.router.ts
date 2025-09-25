import { Router } from "express";
import notificationContentController from "../../controllers/notificationContent.controller";

const notificationContentRoute = Router();

notificationContentRoute.get("/notifys-content", notificationContentController.getAll);
notificationContentRoute.get("/notifys-content/:id", notificationContentController.getById);
notificationContentRoute.post("/notifys-content", notificationContentController.create);
notificationContentRoute.put("/notifys-content/:id", notificationContentController.update);
notificationContentRoute.delete("/notifys-content/:id", notificationContentController.remove);

export default notificationContentRoute;