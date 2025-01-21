import type { RequestHandler } from "express";

import db from "../db/queries.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const getMessages: RequestHandler = asyncErrorHandler(async (req, res) => {
  const messages = await db.getMessages();

  const sortedMessages = messages.sort(
    (a, b) => new Date(b.added).getTime() - new Date(a.added).getTime(),
  );

  res.render("index", {
    title: "Mini Messageboard",
    messages: sortedMessages,
  });
});

export { getMessages };
