import { state } from "../../state";
import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  shadow: ShadowRoot;
  lat: number;
  lng: number;
  connectedCallback() {
    const cs = state.getState();
    this.shadow = this.attachShadow({ mode: "open" });
    var style2 = document.createElement("style");
    style2.textContent = `
    .instrucciones{
      display:none;

    }
    .boton-dar-ubicacion{
     display:none;
    }
    
    `;

    this.render();

    const botonDarUbicacion = this.shadow.querySelector(".boton-dar-ubicacion");
    botonDarUbicacion.addEventListener("click", () => {
      navigator.geolocation.getCurrentPosition((position) => {
        state.setLat(position.coords.latitude);
        state.setLng(position.coords.longitude);
        state.buscarPetsCerca(() => {
          this.shadow.appendChild(style2);
        });
      });
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
        `;
    div.innerHTML = `
        <div class="contenedor">
          <h1 class="titulo">Mascotas perdidas cerca tuyo</h1>
          <p class="instrucciones">Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</p>
          <button class="boton-dar-ubicacion">Dar mi ubicación</button>
        </div>
        `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("home-component", Home);
