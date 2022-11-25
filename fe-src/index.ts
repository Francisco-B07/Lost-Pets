// IMPORT DE COMPONENTES
import { initHeader } from "./components/header";
import { initCardPet } from "./components/card-pet";
import { initCardMyPet } from "./components/card-my-pet";
// IMPORT DE PAGES
import "./pages/home/index";
import "./pages/ingresar/index";
import "./pages/password/index";
import "./pages/mis-datos/index";
import "./pages/reportar-mascota/index";
import "./pages/editar-mascota/index";
import "./pages/mis-mascotas-reportadas/index";

// OTROS IMPORTS
import "./router";
import { state } from "./state";

(function () {
  state.init();
  initHeader();
  initCardPet();
  initCardMyPet();
  const root = document.querySelector(".root")!;
})();
