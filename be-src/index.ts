import * as express from "express";
import { Auth } from "./models";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as path from "path";
import { createProduct } from "./controllers/users-controller";
import { User } from "./models/users";
import { sequelize } from "./models/conn";

// sequelize.sync({ force: true }).then((res) => console.log(res));

// -------------- FUNCIÓN DEL SHA --------------
const SECRET = "skdjrw34*ska#x57za$cka";

function getSHA256ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// -------------- CONSTANTES --------------
const port = process.env.PORT || 3000;
const staticDirPath = path.resolve(__dirname, "../dist");
const app = express();

// -------------- Middleware  --------------
app.use(express.json());

// -------------- SIGNUP --------------
app.post("/auth", async (req, res) => {
  const { email, fullName, password } = req.body;
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      email,
      fullName,
    },
  });
  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email,
      password: getSHA256ofString(password),
      user_id: user.get("id"),
    },
  });

  res.json(user);
});

// -------------- SIGNIN --------------
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const auth = await Auth.findOne({
    where: { email, password: getSHA256ofString(password) },
  });
  const token = jwt.sign({ id: auth.get("user_id") }, SECRET);
  if (auth) {
    res.json({ token });
  } else {
    res.status(400).json({ error: "email or pass incorrect" });
  }
});

// -------------- CHECK --------------
app.post("/check/email", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user === null) {
    res.json({ userExist: false });
  } else {
    res.json({ userExist: true });
  }
});

// -------------- ME --------------

function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch (e) {
    res.status(401).json({ error: true });
  }
}

app.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findByPk(req._user.id);
  res.json(user);
});

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  const ruta = path.resolve(staticDirPath + "/index.html");
  res.sendFile(ruta);
  // res.send(ruta);
});

app.listen(port, () => {
  console.log("app escuchada en el puerto ", port);
});
