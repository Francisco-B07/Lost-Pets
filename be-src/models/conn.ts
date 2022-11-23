import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "railway",
  port: 6113,
  host: "containers-us-west-78.railway.app",
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
