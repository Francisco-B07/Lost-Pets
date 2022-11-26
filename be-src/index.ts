import * as express from "express";
import * as path from "path";
import {
  checkUserExist,
  editarUser,
  signinUser,
  signupUser,
} from "./controllers/auth-controller";
import {
  getAllPets,
  getAllPetsOfUser,
  getOnePet,
  getPetsNear,
} from "./controllers/pets-controller";
import {
  authMiddleware,
  crearPet,
  crearReporte,
  updatePet,
} from "./controllers/users-controller";
import { sequelize } from "./models/conn";

// -------------- CONSTANTES --------------
const port = process.env.PORT || 3000;
const staticDirPath = path.resolve(__dirname, "../dist");
const app = express();

// -------------- Middleware  --------------
app.use(
  express.json({
    limit: "50mb",
  })
);

// -------------- SIGNUP --------------
app.post("/auth", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "me faltan datos en el body",
    });
  }
  const newUser = await signupUser(req.body);
  res.json(newUser);
});
// -------------- EDITAR USUARIO --------------
app.put("/user", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "me faltan datos en el body",
    });
  }
  const user = await editarUser(req.body);
  res.json(user);
});

// -------------- SIGNIN --------------
app.post("/auth/token", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "me faltan datos en el body",
    });
  }
  const token = await signinUser(req.body);
  if (token) {
    res.json({ token });
  } else {
    res.status(400).json({ error: "email or pass incorrect" });
  }
});

// -------------- CHECK USER EXIST--------------
app.post("/check/email", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "me faltan datos en el body",
    });
  }
  const userExist = { userExist: await checkUserExist(req.body.email) };

  res.json(userExist);
});

// -------------- /ME --------------

// app.get("/me", authMiddleware, async (req, res) => {
//   const user = await User.findByPk(req._user.id);
//   res.json(user);
// });

// -------------- CREAR PET --------------
app.post("/pets", authMiddleware, async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "me faltan datos en el body",
    });
  }
  const newPet = await crearPet(req._user.id, req.body);
  if (newPet) {
    res.json(newPet);
  }
});

// -------------- OBTENER TODAS LAS MASCOTAS --------------
app.get("/pets", async (req, res) => {
  const allPets = await getAllPets();
  res.json(allPets);
});

// -------------- OBTENER TODAS LAS MASCOTAS DE UN USUARIO--------------
app.get("/me/pets", authMiddleware, async (req, res) => {
  const allPets = await getAllPetsOfUser(req._user.id);
  if (allPets) {
    res.json(allPets);
  }
});

// -------------- OBTENER UNA MASCOTA --------------
app.get("/pets/:id", async (req, res) => {
  const pet = await getOnePet(req.params.id);
  res.json(pet);
});

// -------------- OBTENER UNA MASCOTA CERCA DE--------------
app.get("/pets-cerca-de", async (req, res) => {
  if (!req.query) {
    res.status(400).json({
      message: "me faltan las coordenadas",
    });
  }
  const hits = await getPetsNear(req.query);
  res.json(hits);
});

// -------------- ACTUALIZAR MASCOTA --------------

app.put("/pets/:id", authMiddleware, async (req, res) => {
  const pet = await updatePet(req.body, req.params.id);
  if (pet) {
    res.json(pet);
  } else {
    res
      .status(400)
      .json({ error: "no se pudo actualizar los datos de la mascota" });
  }
});

// -------------- CREAR REPORTE--------------
app.post("/reporte", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "me faltan datos en el body",
    });
  }
  const newReporte = await crearReporte(req.body);
  if (newReporte) {
    res.json(newReporte);
  }
});

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  const ruta = path.resolve(staticDirPath + "/index.html");
  res.sendFile(ruta);
});

app.listen(port, () => {
  console.log("app escuchada en el puerto ", port);
});
