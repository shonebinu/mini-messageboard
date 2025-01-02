import { Router } from "express";

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.send("new route");
});

export default newRouter;
