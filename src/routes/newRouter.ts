import { Router } from "express";

import {
  createMessage,
  getNewMessageForm,
} from "../controllers/newController.js";

const newRouter = Router();

newRouter.get("/", getNewMessageForm);

newRouter.post("/", createMessage);

export default newRouter;
