import { Auth, User, Pet } from "../models/index";
import { index } from "../lib/algolia";

export async function getAllPets() {
  const allPets = await Pet.findAll();
  return allPets;
}

export async function getAllPetsOfUser(userId) {
  const allPets = await Pet.findAll({
    where: {
      userId: userId,
    },
  });
  return allPets;
}

export async function getOnePet(petId) {
  const pet = await Pet.findByPk(petId);
  return pet;
}

export async function getPetsNear(coordenadas) {
  const { lat, lng } = coordenadas;
  const { hits } = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 10000,
  });
  return hits;
}
