// IMPORT DE COMPONENTES
import { initHeader } from "./components/header";
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
  initHeader();
  const root = document.querySelector(".root")!;
  state.init();
})();
