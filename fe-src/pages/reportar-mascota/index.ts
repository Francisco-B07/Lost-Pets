import { state } from "../../state";
import { Router } from "@vaadin/router";
import * as Mapboxgl from "mapbox-gl";

class ReportarMascota extends HTMLElement {
  // shadow: ShadowRoot;
  MAPBOX_TOKEN = process.env.MAPBOX_KEY;
  // mapboxClient = new MapboxClient(this.MAPBOX_TOKEN);

  mapa: Mapboxgl.Map;
  connectedCallback() {
    // this.shadow = this.attachShadow({ mode: "open" });
    this.render();

    this.mapa = this.initMap();
    // console.log("hola", process.env.NODE_ENV);
  }

  initMap() {
    Mapboxgl.accessToken = this.MAPBOX_TOKEN;
    return new Mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }

  render() {
    const div = document.createElement("div");

    var style = document.createElement("style");
    style.textContent = `
            .contenedor{
              padding: 0px 20px
            }
            .titulo{
              margin-top:33px;
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 700;
              font-size: 40px;
              line-height: 60px;
              color: #000000;
            }
            .instrucciones{
              margin-top:50px;
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 500;
              font-size: 16px;
              line-height: 24px;
              text-align: center;
              text-transform: uppercase;
              color: #000000;
            }
            .boton-dar-ubicacion{
              margin-top:22px;
              width:100%;
              height: 50px;
              border:none;
              background: #FF9DF5;
              border-radius: 4px;
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              text-align: center;
              color: #000000;
            }
            .search-form {
              background-color: coral;
              padding: 10px;
            }
           
            
          
        `;
    div.innerHTML = `
        <div class="contenedor">
          <h1 class="titulo">Reportar mascota perdida</h1>
          <form class="search-form">
            <input name="q" type="search" />
            <button>Buscar</button>
          </form>
          <div id="map" style="width: 100%; height: 50vh; background: #FF9DF5"></div>
        </div>
        `;
    this.appendChild(style);
    this.appendChild(div);
  }
}
customElements.define("reportar-mascota-component", ReportarMascota);
