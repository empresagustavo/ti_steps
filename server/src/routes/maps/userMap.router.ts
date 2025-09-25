import { Router } from "express";
import userController from "../../controllers/user.controller";

const userRoute = Router();

userRoute.get("/users", userController.getAll);
userRoute.get("/users/:id", userController.getById);
userRoute.post("/users", userController.create);
userRoute.put("/users/:id", userController.update);
userRoute.delete("/users/:id", userController.remove);
userRoute.post("/users/navs", userController.createNavMainAccess);
userRoute.delete("/users/:userId/navs/:navId", userController.removeNavMainAccess);

export default userRoute;