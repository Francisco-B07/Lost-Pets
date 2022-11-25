import { Auth, User, Pet } from "../models/index";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

// -------------- FUNCIÓN DEL SHA --------------
export const SECRET = "skdjrw34*ska#x57za$cka";

function getSHA256ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}
// ---------------------------------------------

export async function signupUser(userData) {
  const { email, fullName, password } = userData;
  if (email && fullName && password) {
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        email,
        fullName,
      },
    });
    const [auth, authCreated] = await Auth.findOrCreate({
      where: { userId: user.get("id") },
      defaults: {
        email,
        password: getSHA256ofString(password),
        userId: user.get("id"),
      },
    });
    return user;
  } else {
    throw "error, faltan datos para crear el usuario";
  }
}

export async function signinUser(userData) {
  const { email, password } = userData;
  if (email && password) {
    const auth = await Auth.findOne({
      where: { email, password: getSHA256ofString(password) },
    });
    const token = jwt.sign({ id: auth.get("userId") }, SECRET);
    if (auth) {
      return token;
    } else {
      throw "error al obtener el token";
    }
  } else {
    throw "error, faltan datos para iniciar sesión";
  }
}

export async function checkUserExist(email) {
  const user = await User.findOne({ where: { email: email } });
  if (user === null) {
    return false;
  } else {
    return true;
  }
}
