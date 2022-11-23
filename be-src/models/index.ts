import { Auth } from "./auth";
import { User } from "./users";
import { Pet } from "./pets";

User.hasOne(Auth);
Auth.belongsTo(User);

User.hasMany(Pet);
Pet.belongsTo(User);

export { Auth, User, Pet };
