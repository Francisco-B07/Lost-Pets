import { sequelize } from "./conn";
import { Model, DataTypes } from "sequelize";

export class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);
