import { sequelize } from "./conn";
import { Model, DataTypes } from "sequelize";

export class Pet extends Model {}
Pet.init(
  {
    name: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  { sequelize, modelName: "pet" }
);
