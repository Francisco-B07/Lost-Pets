import { Auth, User, Pet, Reporte } from "../models/index";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../controllers/auth-controller";
import { index } from "../lib/algolia";
import { cloudinary } from "../lib/cloudinary";

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
  const { name, lat, lng, imageDataURL, ubicacion } = petData;
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

export async function updatePet(petData, petId) {
  const { name, lat, lng, imageDataURL, ubicacion } = petData;

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

export async function crearReporte(reporteData) {
  const { reporteNombre, reporteTelefono, reporteInfo, petId } = reporteData;
  console.log("reporteData", reporteData);

  if (petId) {
    const newReport = await Reporte.create({
      reporteNombre,
      reporteTelefono,
      reporteInfo,
      petId: petId,
    }).catch((e) => {
      console.log("ERROR", e);
    });

    return newReport;
  } else {
    throw "Debe enviar petId";
  }
}
