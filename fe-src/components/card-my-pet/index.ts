import { Router } from "@vaadin/router";
import { state } from "../../state";

export function initCardMyPet() {
  const pencil = require("../../img/pencil.svg");
  class CardMyPet extends HTMLElement {
    // shadow: ShadowRoot;
    nombre: string;
    ubicacion: string;
    petId: string;

    connectedCallback() {
      this.nombre = this.getAttribute("name");
      this.ubicacion = this.getAttribute("ubicacion");
      this.petId = this.getAttribute("objectID");
      const cs = state.getState();
      this.render();

      const imagenEl = this.querySelector(".card__imagen-pet");
      const imagen = imagenEl as any;
      imagen.src = this.getAttribute("src");

      const botonEditar = this.querySelector(".editar");
      botonEditar.addEventListener("click", () => {
        state.buscarPetAEditar(this.petId, () => {
          Router.go("/editar-mascota");
        });
      });
    }

    render() {
      var style = document.createElement("style");
      style.textContent = `
      .titulo{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 60px;
        color: #000000;
      }
      .contenedor-card{
        max-height: 300px;
        border: 1px solid black;
        margin: 20px;

      }
      @media (min-width: 800px){
        .contenedor-card{
          width: 40vw;
          margin-left:30vw;
          max-height: 350px;

        }
      }
      .card__footer{
        margin:0px;

        padding: 5px 15px;
      }
       .card__imagen-pet{
          width: 100%;
          max-height: 170px;
          object-fit: cover;
       }
       @media (min-width: 800px){
        .card__imagen-pet{
          max-height: 220px;

        }
      }
       .card__nombre-pet{
        margin:0px;

       }
       .card__ubicacion-pet{
          margin-top: 5px;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          text-transform: uppercase;
          color: #000000;
       }
       .reportar-informacion{
        margin:auto 0;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        text-decoration-line: underline;
        text-transform: uppercase;
        color: #3E91DD;
       }

       .modal-header{
        display:flex;
        flex-direction: column;
       }
       .formulario{
        margin-top:20px;
        width:100%;
       }
       .informacion__textarea{
        width: 86vw;
        height:127px;
        margin-top: -15px;
       }
       .enviar-reporte{
        background: #FF9DF5;
        border-radius: 4px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #000000;
        margin-top: 23px;
        margin-bottom: 30px;
        width:100%;
        border:none;
        height:50px;
       }

      `;
      this.innerHTML = `
      <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />  


          <div class="contenedor-card">
            <img class="card__imagen-pet">
            <div class="card__footer d-flex justify-content-between">
              <div>
                <h1 class="card__nombre-pet">${this.nombre} </h1>
                <p class="card__ubicacion-pet">${this.ubicacion} </p>
              </div>  
              <img class="editar" src="${pencil}"  alt=""> 
            </div>
          </div>


      `;
      this.appendChild(style);
    }
  }
  customElements.define("card-my-pet-component", CardMyPet);
}
