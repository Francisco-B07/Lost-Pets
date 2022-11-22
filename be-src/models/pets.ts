import { sequelize } from "./conn";
import { Model, DataTypes } from "sequelize";

export class Pets extends Model {}
Pets.init(
  {
    name: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  { sequelize, modelName: "pets" }
);
