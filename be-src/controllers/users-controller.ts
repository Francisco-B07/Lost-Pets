import { Auth, User, Pet, Reporte } from "../models/index";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../controllers/auth-controller";
import { index } from "../lib/algolia";
import { cloudinary } from "../lib/cloudinary";
import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_KEY);

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch (e) {
    res.status(401).json({ error: true });
  }
}

export async function crearPet(userId, petData) {
  const { name, lat, lng, imageDataURL, ubicacion, encontrado, eliminado } =
    petData;
  if (!userId) {
    throw "userId es necesario";
  }
  if (imageDataURL) {
    const imagen = await cloudinary.uploader.upload(imageDataURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });

    const newPet = await Pet.create({
      name,
      lat,
      lng,
      ubicacion,
      imageURL: imagen.secure_url,
      userId: userId,
      encontrado,
      eliminado,
    });
    const algoliaRes = await index.saveObject({
      name: newPet.get("name"),
      imageURL: newPet.get("imageURL"),
      ubicacion: newPet.get("ubicacion"),
      _geoloc: {
        lat: newPet.get("lat"),
        lng: newPet.get("lng"),
      },
      objectID: newPet.get("id"),
      userId: userId,
      encontrado: newPet.get("encontrado"),
      eliminado: newPet.get("eliminado"),
    });
    return newPet;
  }
}

// -------------- ACTUALIZAR MASCOTA --------------
function bodyToIndex(body, id?) {
  const respuesta: any = {};

  if (body.name) {
    respuesta.name = body.name;
  }
  if (body.imageURL) {
    respuesta.imageURL = body.imageURL;
  }
  if (body.ubicacion) {
    respuesta.ubicacion = body.ubicacion;
  }
  if (body.encontrado) {
    respuesta.encontrado = body.encontrado;
  }
  if (body.eliminado) {
    respuesta.eliminado = body.eliminado;
  }

  if (body.lat && body.lng) {
    respuesta._geoloc = {
      lat: body.lat,
      lng: body.lng,
    };
  }
  if (id) {
    respuesta.objectID = id;
  }
  return respuesta;
}

export async function updatePet(petData, petId) {
  const {
    name,
    lat,
    lng,
    imageDataURL,
    ubicacion,
    encontrado,
    eliminado,
    imageURL,
  } = petData;

  if (imageDataURL) {
    const imagen = await cloudinary.uploader.upload(imageDataURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });

    const pet = await Pet.update(
      {
        name,
        lat,
        lng,
        imageURL: imagen.secure_url,
        ubicacion,
        encontrado,
        eliminado,
      },
      {
        where: {
          id: petId,
        },
      }
    );
    const indexItem = bodyToIndex(petData, petId);
    // console.log(indexItem);

    const algoliaRes = await index.partialUpdateObject(indexItem);
    return pet;
  } else {
    const pet = await Pet.update(
      {
        name,
        lat,
        lng,
        imageURL: imageURL,
        ubicacion,
        encontrado,
        eliminado,
      },
      {
        where: {
          id: petId,
        },
      }
    );
    const indexItem = bodyToIndex(petData, petId);
    // console.log(indexItem);

    const algoliaRes = await index.partialUpdateObject(indexItem);
    return pet;
  }
}

// -------------------------------------------------------------------

async function obtenerEmailTo(userId) {
  const user = await User.findByPk(userId);
  const email = user.get("email");
  return email;
}

export async function crearReporte(reporteData) {
  const { reporteNombre, reporteTelefono, reporteInfo, petId, userId } =
    reporteData;

  if (petId) {
    const newReport = await Reporte.create({
      reporteNombre,
      reporteTelefono,
      reporteInfo,
      petId: petId,
    }).catch((e) => {
      console.log("ERROR", e);
    });

    const email = await obtenerEmailTo(userId);

    const msg = {
      to: email as string,
      from: "franciscojburgoa@gmail.com",
      subject: "Vieron tu mascota",
      text: reporteInfo,
      html: `
      <p><b>Mi nombre es: </b> ${reporteNombre}</p>
     
      <strong>VI TU MASCOTA</strong>
      <p>${reporteInfo}</p>
     
      <p><b>Mi telefono es: </b> ${reporteTelefono}</p>
      <p>Saludos ${reporteNombre}.</p>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (err) {
      console.log(err.code, err.message);
    }

    return newReport;
  } else {
    throw "Debe enviar petId";
  }
}
