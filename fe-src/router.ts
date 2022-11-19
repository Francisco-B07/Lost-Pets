import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-component" },
  { path: "/ingresar", component: "ingresar-component" },
  { path: "/password", component: "password-component" },
  { path: "/mis-datos", component: "mis-datos-component" },
  {
    path: "/mis-mascotas-reportadas",
    component: "mis-mascotas-reportadas-component",
  },
  {
    path: "/reportar-mascota",
    component: "reportar-mascota-component",
  },
  {
    path: "/editar-mascota",
    component: "editar-mascota-component",
  },
]);
