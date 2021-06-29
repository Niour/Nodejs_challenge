import qs from "qs";
// import cors from "cors";
import express from "express";
// import morgan from "morgan";
// import helmet from "helmet";
import { firstRouter } from "./routes/first";

const app = express();

// app.use(morgan("dev"));

// http://expressjs.com/en/4x/api.html#app.settings.table
// https://github.com/expressjs/express/issues/3039
// https://github.com/expressjs/express/issues/4053
app.set("query parser", function (str: string) {
  return qs.parse(str, { comma: true });
});

app.use(firstRouter);

app.listen(80);
