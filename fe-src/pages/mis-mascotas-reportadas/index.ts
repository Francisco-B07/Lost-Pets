import { state } from "../../state";
import { Router } from "@vaadin/router";

class MisMascotasReportadas extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    const cs = state.getState();

    this.render();
    state.buscarMisPets(() => {
      if (cs.misPets.length == 0) {
        const cartel = document.createElement("h2");
        cartel.textContent = "NO HAS REPORTADO NINGUNA MASCOTA";
        cartel.classList.add("cartel-no-hay-mascotas");
        this.shadow.appendChild(cartel);
      } else {
        for (let index = 0; index < cs.misPets.length; index++) {
          const element = cs.misPets[index];

          if (!element.eliminado) {
            const card = document.createElement(
              "card-my-pet-component"
            ) as HTMLElement;
            card.setAttribute("src", element.imageURL);
            card.setAttribute("name", element.name);
            card.setAttribute("ubicacion", element.ubicacion);
            card.setAttribute("objectID", element.id);
            card.setAttribute("encontrado", element.encontrado);
            card.classList.add("card-pet");

            this.shadow.appendChild(card);
          }
        }
      }
    });
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
          <h1 class="titulo">Mis mascotas  reportadas</h1>
        </div>
        `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define(
  "mis-mascotas-reportadas-component",
  MisMascotasReportadas
);
