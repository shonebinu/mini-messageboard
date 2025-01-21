import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import type { RequestHandler } from "express";
import db from "../db/queries.js";

const getNewMessageForm: RequestHandler = asyncErrorHandler(
  async (req, res) => {
    res.render("form");
  }
);

const createMessage: RequestHandler = asyncErrorHandler(async (req, res) => {
  const { authorName, authorMessage } = req.body;
  db.insertMessage(authorName, authorMessage, new Date());
  res.redirect("/");
});

export { getNewMessageForm, createMessage };
