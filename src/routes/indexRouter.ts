import { Router } from "express";
import { getMessages } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getMessages);

export default indexRouter;
