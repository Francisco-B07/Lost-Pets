import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "postgres",
  password: "J8BEs7qug0qqq8pT9Qoa",
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
