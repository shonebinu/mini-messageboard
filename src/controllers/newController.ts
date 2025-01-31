import type { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

import db from "../db/queries.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const getNewMessageForm: RequestHandler = asyncErrorHandler(
  async (req, res) => {
    res.render("form");
  },
);

const validateMessage: RequestHandler[] = [
  body("authorName")
    .trim()
    .notEmpty()
    .withMessage("Name shouldn't be empty")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name should only contain letters."),
  body("authorMessage")
    .trim()
    .notEmpty()
    .withMessage("Message shouldn't be empty"),
];

const createMessage: RequestHandler[] = [
  ...validateMessage,
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
