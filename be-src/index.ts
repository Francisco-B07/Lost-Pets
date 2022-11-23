import * as express from "express";
import { Auth, User, Pet } from "./models/index";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as path from "path";
import { sequelize } from "./models/conn";
import { index } from "./lib/algolia";

// -------------- BORRA LA BASE DE DATOS --------------

// sequelize.sync({ force: true }).then((res) => console.log(res));
// sequelize.sync({ alter: true }).then((res) => console.log(res));

// -------------- FUNCIÓN DEL SHA --------------
const SECRET = "skdjrw34*ska#x57za$cka";

function getSHA256ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// -------------- CONSTANTES --------------
const port = process.env.PORT || 3000;
const staticDirPath = path.resolve(__dirname, "../dist");
const app = express();

// -------------- VARIABLES DE ENTORNO --------------
// console.log(process.env.NODE_ENV);

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
    where: { userId: user.get("id") },
    defaults: {
      email,
      password: getSHA256ofString(password),
      userId: user.get("id"),
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
  const token = jwt.sign({ id: auth.get("userId") }, SECRET);
  if (auth) {
    res.json({ token });
  } else {
    res.status(400).json({ error: "email or pass incorrect" });
  }
});

// -------------- CHECK USER EXIST--------------
app.post("/check/email", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user === null) {
    res.json({ userExist: false });
  } else {
    res.json({ userExist: true });
  }
});

// -------------- /ME --------------

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

// -------------- CREAR PET --------------
app.post("/pets", authMiddleware, async (req, res) => {
  // const { name, lat, lng } = req.body;
  const newPet = await Pet.create({
    ...req.body,
    userId: req._user.id,
  });
  const algoliaRes = await index.saveObject({
    name: newPet.get("name"),
    _geoloc: {
      lat: newPet.get("lat"),
      lng: newPet.get("lng"),
    },
    objectID: newPet.get("id"),
  });
  res.json(newPet);
});

// -------------- OBTENER TODAS LAS MASCOTAS --------------
app.get("/pets", async (req, res) => {
  const allPets = await Pet.findAll();
  res.json(allPets);
});
// -------------- OBTENER TODAS LAS MASCOTAS DE UN USUARIO--------------
app.get("/me/pets", authMiddleware, async (req, res) => {
  const allPets = await Pet.findAll({
    where: {
      userId: req._user.id,
    },
  });
  res.json(allPets);
});

// -------------- OBTENER UNA MASCOTA --------------
app.get("/pets/:id", async (req, res) => {
  const pet = await Pet.findByPk(req.params.id);
  res.json(pet);
});

// -------------- OBTENER UNA MASCOTA CERCA DE--------------
app.get("/pets-cerca-de", async (req, res) => {
  const { lat, lng } = req.query;
  const { hits } = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 10000,
  });
  res.json(hits);
});

// -------------- ACTUALIZAR MASCOTA --------------

function bodyToIndex(body, id?) {
  const respuesta: any = {};

  if (body.name) {
    respuesta.name = body.name;
  }

  if (body.lat && body.lng) {
    respuesta._geoloc = {
      lat: body.lat,
      lng: body.lat,
    };
  }
  if (id) {
    respuesta.objectID = id;
  }
  return respuesta;
}

app.put("/pets/:id", async (req, res) => {
  const pet = await Pet.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  const indexItem = bodyToIndex(req.body, req.params.id);
  // console.log(indexItem);

  const algoliaRes = await index.partialUpdateObject(indexItem);
  res.json(pet);
});

app.use(express.static(staticDirPath));

// Usamos este handler para que express sirva la SPA con los archivos o rutas que no estan en 'dist'
app.get("*", function (req, res) {
  const ruta = path.resolve(staticDirPath + "/index.html");
  res.sendFile(ruta);
  // res.send(ruta);
});

app.listen(port, () => {
  console.log("app escuchada en el puerto ", port);
});
