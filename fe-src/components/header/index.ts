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
      const linkMisDatosEl = document.querySelector(".mis-datos");
      const linkMascotasReportadasEl = document.querySelector(
        ".mascotas-reportadas"
      );
      const linkReportarMascotasEl =
        document.querySelector(".reportar-mascotas");
      const navbarCollapseEl = document.querySelector(
        ".navbar-collapse"
      ) as HTMLElement;

      navbarCollapseEl.style.display = "none";
      buttonNavbarTogglerEl.addEventListener("click", () => {
        if (navbarCollapseEl.style.display == "none") {
          navbarCollapseEl.style.display = "initial";
        } else {
          navbarCollapseEl.style.display = "none";
        }
      });

      linkMisDatosEl.addEventListener("click", () => {
        navbarCollapseEl.style.display = "none";

        if (cs.token != "") {
          Router.go("/mis-datos");
        } else {
          Router.go("/ingresar");
        }
      });
      linkMascotasReportadasEl.addEventListener("click", () => {
        navbarCollapseEl.style.display = "none";
        if (cs.token != "") {
          Router.go("/mis-mascotas-reportadas");
        } else {
          Router.go("/ingresar");
        }
      });
      linkReportarMascotasEl.addEventListener("click", () => {
        navbarCollapseEl.style.display = "none";
        if (cs.token != "") {
          Router.go("/reportar-mascota");
        } else {
          Router.go("/ingresar");
        }
      });
    }

    render() {
      //   const div = document.createElement("div");

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
              .collapse{
                background: #8AF1FF !important;
                height: 91vh;
                position: absolute;
                top: 60px;
                width: 100vw;
                z-index: 5;
              }
              .navbar-nav{
                margin-top: 90px;
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
              </div>
              <div class=" navbar-collapse collapse" id="navbarNavDropdown">
                <ul class="navbar-nav d-flex flex-column align-items-center justify-content-evenly">
                  <li class="nav-item mis-datos">
                    <a class="nav-link active" aria-current="page">Mis datos</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mascotas-reportadas">Mis mascotas <br> reportadas</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link reportar-mascotas">Reportar <br> mascotas</a>
                  </li>
                  
                </ul>
              </div>
            </div>
          </nav>
        `;
      this.appendChild(style);
    }
  }
  customElements.define("header-component", Header);
}
