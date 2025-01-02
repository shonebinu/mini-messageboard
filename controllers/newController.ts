import asyncErrorHandler from "../utils/asyncErrorHandler";
import { RequestHandler } from "express";
import { messages } from "../data";

const getNewMessageForm: RequestHandler = asyncErrorHandler(
  async (req, res) => {
    res.render("form");
  }
);

const createMessage: RequestHandler = asyncErrorHandler(async (req, res) => {
  const { authorName, authorMessage } = req.body;
  messages.push({
    text: authorMessage,
    user: authorName,
    added: new Date(),
  });
  res.redirect("/");
});

export { getNewMessageForm, createMessage };
