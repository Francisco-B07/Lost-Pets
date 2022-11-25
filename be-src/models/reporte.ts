import { sequelize } from "./conn";
import { Model, DataTypes } from "sequelize";

export class Reporte extends Model {}
Reporte.init(
  {
    reporteNombre: DataTypes.STRING,
    reporteTelefono: DataTypes.STRING,
    reporteInfo: DataTypes.STRING,
  },
  { sequelize, modelName: "reporte" }
);
