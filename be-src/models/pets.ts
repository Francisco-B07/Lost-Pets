import { sequelize } from "./conn";
import { Model, DataTypes } from "sequelize";

export class Pet extends Model {}
Pet.init(
  {
    name: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    imageURL: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
  },
  { sequelize, modelName: "pet" }
);
