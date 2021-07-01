import qs from "qs";
// import cors from "cors";
import express from "express";
// import morgan from "morgan";
import helmet from "helmet";
import { signupRouter } from "./routes/signup";
import { sequelize } from "./models/database";
import { loginRouter } from "./routes/login";
import { authenticateUser } from "./middleware/authentication";
import { handleError } from "./middleware/errors";
import { defaultRouter } from "./routes/default";
import { companyRouter } from "./routes/company";

const app = express();

// http://expressjs.com/en/4x/api.html#app.settings.table
// https://github.com/expressjs/express/issues/3039
// https://github.com/expressjs/express/issues/4053
app.set("query parser", function (str: string) {
  return qs.parse(str, { comma: true });
});
// app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(signupRouter);
app.use(loginRouter);

app.use(authenticateUser);

app.use(companyRouter);
app.use(defaultRouter);

app.use(handleError);

// sequelize.sync({ force: true }).then(() => app.listen(80));
sequelize.sync().then(() => app.listen(80));
