import { messages } from "../data";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { RequestHandler } from "express";

const displayMessages: RequestHandler = asyncErrorHandler(async (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

export { displayMessages };
