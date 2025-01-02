import { Router } from "express";
import { displayMessages } from "../controllers/indexController";

const indexRouter = Router();

indexRouter.get("/", displayMessages);

export default indexRouter;
