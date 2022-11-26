import { Router } from "@vaadin/router";
import { state } from "../../state";

export function initHeader() {
  const logo = require("../../img/logo.svg");
  class Header extends HTMLElement {
    // shadow: ShadowRoot;
    connectedCallback() {
      // this.shadow = this.attachShadow({ mode: "open" });
      const cs = state.getState();
      this.render();

      const buttonNavbarTogglerEl = document.querySelector(".navbar-toggler");
      const buttonCerrarSesion = document.querySelector(
        ".cerrar-sesion-collapse"
      ) as HTMLElement;
      const buttonCerrarSesionNavbar = document.querySelector(
        ".link-cerrar-sesion"
      ) as HTMLElement;

      const linkMisDatosEl = document.querySelector(".mis-datos");
      const linkMisDatosNavbar = document.querySelector(".link-mis-datos");

      const linkMascotasReportadasEl = document.querySelector(
        ".mascotas-reportadas"
      );
      const linkMascotasReportadasNavbar = document.querySelector(
        ".link-mascotas-reportadas"
      );

      const linkReportarMascotasEl =
        document.querySelector(".reportar-mascotas");
      const linkReportarMascotasNavbar = document.querySelector(
        ".link-reportar-mascotas"
      );

      const navbarCollapseEl = document.querySelector(
        ".navbar-collapse"
      ) as HTMLElement;

      const usuario = document.querySelector(".usuario") as HTMLElement;

      navbarCollapseEl.style.display = "none";
      buttonNavbarTogglerEl.addEventListener("click", () => {
        if (navbarCollapseEl.style.display == "none") {
          navbarCollapseEl.style.display = "initial";
        } else {
          navbarCollapseEl.style.display = "none";
        }
      });

      // -------------------- IR A MIS DATOS --------------------
      linkMisDatosEl.addEventListener("click", () => {
        navbarCollapseEl.style.display = "none";
        state.setRuta("mis-datos");

        if (cs.token != "") {
          Router.go("/mis-datos");
        } else {
          Router.go("/ingresar");
        }
      });
      linkMisDatosNavbar.addEventListener("click", () => {
        state.setRuta("mis-datos");

        if (cs.token != "") {
          Router.go("/mis-datos");
        } else {
          Router.go("/ingresar");
        }
      });

      // -------------------- IR A MASCOTAS REPORTADAS --------------------
      linkMascotasReportadasEl.addEventListener("click", () => {
        navbarCollapseEl.style.display = "none";
        state.setRuta("mis-mascotas-reportadas");
        if (cs.token != "") {
          Router.go("/mis-mascotas-reportadas");
        } else {
          Router.go("/ingresar");
        }
      });
      linkMascotasReportadasNavbar.addEventListener("click", () => {
        state.setRuta("mis-mascotas-reportadas");

        if (cs.token != "") {
          Router.go("/mis-mascotas-reportadas");
        } else {
          Router.go("/ingresar");
        }
      });

      // -------------------- IR A REPORTAR MASCOTA --------------------
      linkReportarMascotasEl.addEventListener("click", () => {
        state.setRuta("reportar-mascota");

        navbarCollapseEl.style.display = "none";
        if (cs.token != "") {
          Router.go("/reportar-mascota");
        } else {
          Router.go("/ingresar");
        }
      });
      linkReportarMascotasNavbar.addEventListener("click", () => {
        state.setRuta("reportar-mascota");

        if (cs.token != "") {
          Router.go("/reportar-mascota");
        } else {
          Router.go("/ingresar");
        }
      });

      // -------------------- CERRAR SESION --------------------
      if (cs.token == "") {
        buttonCerrarSesion.style.display = "none";
        buttonCerrarSesionNavbar.style.display = "none";
      } else {
        buttonCerrarSesion.style.display = "initial";
        buttonCerrarSesionNavbar.style.display = "initial";
      }

      buttonCerrarSesion.addEventListener("click", () => {
        navbarCollapseEl.style.display = "none";
        state.setToken("");
        state.setEmail("");
      });
      buttonCerrarSesionNavbar.addEventListener("click", () => {
        state.setToken("");
        state.setEmail("");
      });
    }

    render() {
      //   const div = document.createElement("div");
      const cs = state.getState();
      var style = document.createElement("style");
      style.textContent = `
              .navbar{
                background: #FF6868 !important;
                padding: 0px !important;
              }
              .container-fluid{
                padding: 0px !important;
              }
              .container-navbar{
                width:100%;
                padding: 8px 20px ;
              }
              @media (min-width: 800px){
                .logo{
                  width: 60px;
                  height: auto;
                  margin: 5px 100px 5px 40px;
                }
              }
              @media (min-width: 800px){
                .navbar-toggler{
                  display: none;
                }
              }
              .navbar-links{
                width:100%;
              }
              @media (max-width: 800px){
                .navbar-links{
                  display: none;
                }
              }
              .navbar-links__listado{
                margin:0;
                padding: 5px 30px;
              }
              .nav-item{
                list-style:none;
                margin: auto 0;
              }
              .collapse{
                background: #8AF1FF !important;
                height: 91vh;
                position: absolute;
                top: 60px;
                width: 100vw;
                z-index: 5;
              }
              @media (min-width: 800px){
                #navbarNavDropdown{
                  background: red !important;
                  display: none !important;
                }
              }
              .navbar-nav{
                margin-top: 40px;
                height: 60vh;
                
              }
              .nav-link{
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 36px;
                color: #000000;
                text-align: center;
              }
            
              @media (min-width: 800px){
                .nav-link{
                  font-size: 20px;
                  line-height: 26px;
                  cursor: pointer;

                }
                .nav-link:hover{
                  font-size: 21px;
                  color: #3377db;

                }
              }
              .contenedor-user{
                margin-top: 60px;
              }
              .user{
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 400;
                font-size: 24px;
                line-height: 36px;
                text-align: center;
                color: #000000;
              }
              @media (min-width: 800px){
                .user{
                  font-size: 18px;
                  line-height: 26px;
                  margin:0px;
                }
              }
              .cerrar-sesion{
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                text-align: center;
                text-decoration-line: underline;
                text-transform: uppercase;
                color: #C6558B;
              }
              
              @media (min-width: 800px){
                .cerrar-sesion{
                  margin: 0;
                  font-size: 14px;
                  cursor: pointer;
                }
                .cerrar-sesion:hover{
                  font-size: 15px;
                }

              }
              
             `;

      this.innerHTML = `
          <nav class="navbar-expand-lg bg-light navbar">
            <div class="container-fluid">
            <div class="container-navbar d-flex justify-content-between">
              <a class="navbar-brand" href="/">
                <img class="logo" src="${logo}"  alt=""> 
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="navbar-links ">
                <ul class="navbar-links__listado d-flex align-items-center justify-content-around">
                  <li class="nav-item link-mis-datos">
                    <a class="nav-link ">Mis datos</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link  link-mascotas-reportadas">Mis mascotas <br> reportadas</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link  link-reportar-mascotas">Reportar <br> mascotas</a>
                  </li>
                  <div class="d-flex flex-column justify-content-center usuario">
                    <p class="user">${cs.email}</p>
                    <p class="cerrar-sesion link-cerrar-sesion">Cerrar sesión</p>
                  </div>
                </ul>

              </div>
              </div>
              <div class=" navbar-collapse collapse" id="navbarNavDropdown">
                <ul class="navbar-nav d-flex flex-column align-items-center justify-content-evenly">
                  <li class="nav-item mis-datos">
                    <a class="nav-link" aria-current="page">Mis datos</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mascotas-reportadas">Mis mascotas <br> reportadas</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link reportar-mascotas">Reportar <br> mascotas</a>
                  </li>
                  
                  </ul>
                  <div class="nav-item contenedor-user">
                    <p class="user">${cs.email}</p>
                    <p class="cerrar-sesion cerrar-sesion-collapse">Cerrar sesión</p>
                  </div>
              </div>
            </div>
          </nav>
        `;
      this.appendChild(style);
    }
  }
  customElements.define("header-component", Header);
}
