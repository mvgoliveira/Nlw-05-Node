import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsController();
const userController = new UsersController();
const messageController = new MessagesController();

routes.post("/settings", settingsController.create);

routes.post("/users", userController.create);

routes.post("/messages", messageController.create);
routes.get("/messages/:user_id", messageController.showByUser);

export { routes }