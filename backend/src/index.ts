import qs from "qs";
// import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { signupRouter } from "./routes/signup";
import { loginRouter } from "./routes/login";
import { authenticateUser } from "./middleware/authentication";
import { handleError } from "./middleware/errors";
import { defaultRouter } from "./routes/default";
import { companyRouter } from "./routes/company";
import { jobRouter } from "./routes/job";
import { loggingOnFinish, logTime } from "./middleware/logging";
import { logRouter } from "./routes/log";
import swaggerConfig, { htmlReDoc } from "./utils/swaggerConfig";
import { searchRouter } from "./routes/search";

export const app = express();

// http://expressjs.com/en/4x/api.html#app.settings.table
// https://github.com/expressjs/express/issues/3039
// https://github.com/expressjs/express/issues/4053
app.set("query parser", function (str: string) {
  return qs.parse(str, { comma: true });
});

// Middleware for serving static files at public folder.
app.use(express.static("public"));
app.use(
  morgan("dev", {
    skip: function (_req, _res) {
      return process.env.DEVE === "TRUE" ? true : false;
    },
  })
);

// These middleware are for logging request at logs table.
app.use(logTime);
app.use(loggingOnFinish);

// Serves for documentation.
app.get("/swagger.json", (_req, res) => {
  res.send(swaggerConfig);
});
app.get("/docs", (_req, res) => {
  res.set("Content-Type", "text/html");
  res.send(htmlReDoc);
});

// Helper routes
app.use(helmet());
app.use(express.json());

// Basic Routes.
app.use(signupRouter);
app.use(loginRouter);

app.use(authenticateUser);

app.use(companyRouter);
app.use(defaultRouter);
app.use(jobRouter);
app.use(logRouter);
app.use(searchRouter);

// Last Route to check for Errors.
app.use(handleError);

// Catches all requests that does not point to specific route.
app.use(function (_req, res) {
  res.send(404);
});
