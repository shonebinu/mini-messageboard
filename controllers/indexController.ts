import { messages } from "../data";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { RequestHandler } from "express";

const getMessages: RequestHandler = asyncErrorHandler(async (req, res) => {
  const sortedMessages = messages.toSorted(
    (a, b) => new Date(b.added) - new Date(a.added)
  );

  res.render("index", {
    title: "Mini Messageboard",
    messages: sortedMessages,
  });
});

export { getMessages };
