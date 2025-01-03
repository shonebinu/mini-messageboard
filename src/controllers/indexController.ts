import { messages } from "../data";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { RequestHandler } from "express";

const getMessages: RequestHandler = asyncErrorHandler(async (req, res) => {
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.added).getTime() - new Date(a.added).getTime()
  );

  res.render("index", {
    title: "Mini Messageboard",
    messages: sortedMessages,
  });
});

export { getMessages };
