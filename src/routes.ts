import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsControllers } from "./controllers/SettingsController";
import { UserController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsControllers();
const userController = new UserController();
const messageController = new MessagesController();

routes.post("/settings", settingsController.create);

routes.post("/users", userController.create);

routes.post("/messages", messageController.create);
routes.get("/messages/:user_id", messageController.showByUser);

export { routes }