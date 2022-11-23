import { sequelize } from "./models/conn";
import "./models/index";

sequelize.sync({ alter: true }).then((res) => console.log(res));

// podemos usar el force si necesitamos resetear la base por completo
// sequelize.sync({ force: true }).then((res) => console.log(res));
