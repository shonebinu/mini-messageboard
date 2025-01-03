import { Router } from "express";
import { getNewMessageForm, createMessage } from "../controllers/newController";

const newRouter = Router();

newRouter.get("/", getNewMessageForm);

newRouter.post("/", createMessage);

export default newRouter;
