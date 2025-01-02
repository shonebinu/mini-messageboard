import express from "express";
import indexRouter from "./routes/indexRouter";
import newRouter from "./routes/newRouter";

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use("/", indexRouter);
app.use("/new", newRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Mini Message Board - listening on port ${PORT}`);
});
