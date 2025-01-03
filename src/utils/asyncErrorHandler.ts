import { RequestHandler } from "express";

const asyncErrorHandler = (func: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};

export default asyncErrorHandler;
