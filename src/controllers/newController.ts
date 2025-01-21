import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import type { RequestHandler } from "express";
import db from "../db/queries.js";
import { body, validationResult } from "express-validator";

const getNewMessageForm: RequestHandler = asyncErrorHandler(
  async (req, res) => {
    res.render("form");
  }
);

const validateMessage = [
  body("authorName")
    .trim()
    .notEmpty()
    .withMessage("Name shouldn't be empty")
    .isAlpha()
    .withMessage("Name should only contain letters."),
  body("authorMessage")
    .trim()
    .notEmpty()
    .withMessage("Message shouldn't be empty"),
];

const createMessage = [
  validateMessage,
  asyncErrorHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("error", {
        message:
          "Both author name and message shouldn't be empty. Author name should only contain letters.", // errors.array()
      });
    }
    const { authorName, authorMessage } = req.body;
    db.insertMessage(authorName, authorMessage, new Date());
    res.redirect("/");
  }),
];

export { getNewMessageForm, createMessage };
