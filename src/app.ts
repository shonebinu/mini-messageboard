import express, { type ErrorRequestHandler } from "express";
import indexRouter from "./routes/indexRouter.js";
import newRouter from "./routes/newRouter.js";
import path from "node:path";

const app = express();

app.set("views", path.join(import.meta.dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(import.meta.dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/new", newRouter);

// 404 Middleware
app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

// Error Handler
const errorRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500).render("error", {
    message: err.message,
  });
};

app.use(errorRequestHandler);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Mini Message Board - listening on port ${PORT}`);
});
