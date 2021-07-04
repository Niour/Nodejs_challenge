import { app } from "./index";
import { sequelize } from "./models/database";

// sequelize.sync({ force: true }).then(() => app.listen(80));
sequelize.sync().then(() => app.listen(80));
