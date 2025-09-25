import { Router } from "express";
import navMainController from "../../controllers/navMain.controller";

const navMainRoute = Router();

navMainRoute.get("/navs-main", navMainController.getAll);
navMainRoute.get("/navs-main/:id", navMainController.getById);
navMainRoute.post("/navs-main", navMainController.create);
navMainRoute.put("/navs-main/:id", navMainController.update);
navMainRoute.delete("/navs-main/:id", navMainController.remove);

export default navMainRoute;