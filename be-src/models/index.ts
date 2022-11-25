import { Auth } from "./auth";
import { User } from "./users";
import { Pet } from "./pets";
import { Reporte } from "./reporte";

User.hasOne(Auth);
Auth.belongsTo(User);

User.hasMany(Pet);
Pet.belongsTo(User);

Pet.hasMany(Reporte);
Reporte.belongsTo(Pet);

export { Auth, User, Pet, Reporte };
