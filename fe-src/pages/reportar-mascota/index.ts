import { state } from "../../state";
import { Router } from "@vaadin/router";
import * as Mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Dropzone from "dropzone";

class ReportarMascota extends HTMLElement {
  // shadow: ShadowRoot;
  MAPBOX_TOKEN = process.env.MAPBOX_KEY;
  lng: number = -68.5292228;
  lat: number = -31.5346781;
  ubicacion: string = "Casa Natal de Domingo Faustino Sarmiento";
  // mapboxClient = new MapboxClient(this.MAPBOX_TOKEN);

  mapa: Mapboxgl.Map;
  connectedCallback() {
    // this.shadow = this.attachShadow({ mode: "open" });

    this.render();
    const inputEl = this.querySelector(".input-nombre-mascota");
    const contenedorImagen = this.querySelector(".foto-mascota__imagen");
    const input = inputEl as any;
    const cs = state.getState();
    let imageDataURL;

    const myDropzone = new Dropzone(".foto-mascota__boton", {
      url: "/falsa",
      autoProcessQueue: false,
      previewsContainer: contenedorImagen,
    });
    myDropzone.on("thumbnail", function (file) {
      // usando este evento pueden acceder al dataURL directamente
      imageDataURL = file.dataURL;
    });

    const botonReportar = this.querySelector(".boton-reportar");
    const botonCancelar = this.querySelector(".boton-cancelar");
    let geocoder = document.getElementById("geocoder");

    this.mapa = this.initMap();
    this.crearMarcador(this.lng, this.lat);
    geocoder.appendChild(this.inputBuscador().onAdd(this.mapa));

    botonReportar.addEventListener("click", () => {
      if (input.value !== "") {
        state.setNamePet(input.value);
        state.setLng(this.lng);
        state.setLat(this.lat);
        state.setUbicacion(this.ubicacion);
        state.reportarPet(imageDataURL, () => {
          Router.go("/mis-mascotas-reportadas");
        });
      } else {
        alert("Debe ingresar un nombre para continuar");
      }
    });
    botonCancelar.addEventListener("click", () => {
      Router.go("/");
    });
  }

  initMap() {
    Mapboxgl.accessToken = this.MAPBOX_TOKEN;
    return new Mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.lng, this.lat],
      zoom: 14,
    });
  }

  inputBuscador() {
    const geocoder = new MapboxGeocoder({
      accessToken: this.MAPBOX_TOKEN,
      mapboxgl: Mapboxgl,
    });
    geocoder.on("result", ($event) => {
      const { result } = $event;

      this.lng = result.center[0];
      this.lat = result.center[1];
      this.ubicacion = result.text;
      geocoder.clear();
      this.crearMarcador(this.lng, this.lat);
    });

    return geocoder;
  }

  crearMarcador(lng: number, lat: number) {
    const popup = new Mapboxgl.Popup().setHTML(
      "<h3 style='text-align:center'>Ubicación</h3><p>En esta ubicación se perdió mi mascota</p>"
    );
    const marker = new Mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(this.mapa);

    marker.on("dragend", () => {});
  }

  render() {
    const div = document.createElement("div");

    var style = document.createElement("style");
    style.textContent = `
            .contenedor{
              padding: 0px 20px
            }
            @media (min-width: 800px){
              .contenedor{
                width: 40vw !important;
                margin-left:30vw;
              }
            }
            .titulo{
              margin-top:33px;
              margin-bottom:30px;
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 700;
              font-size: 40px;
              line-height: 60px;
              color: #000000;
            }
            @media (min-width: 800px){
              .titulo{
                margin-top:50px;
                font-size: 50px;
                text-align:center;
              }
            }
            /*FOTO MASCOTA*/
            .foto-mascota{
              margin-top:36px;
            }
            .foto-mascota__imagen{
              max-height: 170px;

              width: 100%;
              margin-bottom: 18px;
              
            }
            .dz-image img{
              max-height: 170px;
              width: 100%;
              object-fit: cover;

            }
            .dz-details{
              display: none;
            }
            .boton-texto{
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              text-align: center;
              color: #000000;
              border: none;
              width: 100%;
              height: 50px;
            }
            .foto-mascota__boton{
              background: #97EA9F;
              border-radius: 4px;
            }

            /*MAPA*/
            .mapa{
              width: 100%;
              height: 40vh;
              margin-top:20px;
              margin-bottom: 20px;
            }

            /*BUSCADOR*/
            .input-search-ubicacion{
              width:100%;
            }
            @media (min-width: 800px){
              .mapboxgl-ctrl-geocoder{
                width: 40vw !important;
              }
            }
            .input-search-ubicacion__label{
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 500;
              font-size: 16px;
              line-height: 24px;
              text-transform: uppercase;
              color: #000000;
              margin-bottom:5px;
            }

            .mapboxgl-popup{
              max-width:200px;
            }
            #geocoder{
              width:100%;
            }
          .input-search-ubicacion__instrucciones{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            text-transform: uppercase;
            color: #000000;
            margin-top: 18px;
            margin-bottom:36px;
          }
          .boton-reportar{
            background: #FF9DF5;
            border-radius: 4px;
          }  
          .boton-cancelar{
            background: #CDCDCD;
            border-radius: 4px;
            margin-top: 18px;
            margin-bottom: 91px;
          }  
       
            
          
        `;
    div.innerHTML = `
          

        <div class="contenedor">
          <h1 class="titulo">Reportar mascota perdida</h1>
          <div class="form-floating mb-3">
              <input type="text" class="form-control input-nombre-mascota" id="nombre" placeholder="nombre de tu mascota perdida">
              <label for="nombre">NOMBRE</label>
          </div>
          <div class="foto-mascota">
            <div class="foto-mascota__imagen drpzone-previews"></div>
            <button class="foto-mascota__boton boton-texto">Agregar foto</button>
          </div>
          <div id="map" class="mapa"></div>
          <div class="input-search-ubicacion">
            <div>
              <label class="input-search-ubicacion__label">Ubicación</label>
              <div id="geocoder"></div>
              <p class="input-search-ubicacion__instrucciones">Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
            </div>
          </div>
          <button class="boton-reportar boton-texto">Reportar como perdido</button>
          <button class="boton-cancelar boton-texto">Cancelar</button>
        </div>
        `;
    this.appendChild(style);
    this.appendChild(div);
  }
}
customElements.define("reportar-mascota-component", ReportarMascota);
