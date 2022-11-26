import { Router } from "@vaadin/router";
import { state } from "../../state";

export function initCardPet() {
  class CardPet extends HTMLElement {
    // shadow: ShadowRoot;
    nombre: string;
    ubicacion: string;
    petId: string;
    userId: string;
    connectedCallback() {
      this.nombre = this.getAttribute("name");
      this.ubicacion = this.getAttribute("ubicacion");
      this.petId = this.getAttribute("objectID");
      this.userId = this.getAttribute("userId");
      const cs = state.getState();

      this.render();

      const reportarInformacion = this.querySelector(".reportar-informacion");

      const botonCruz = this.querySelector(".btn-close");
      const modal = this.querySelector(".modal") as HTMLElement;

      const imagenEl = this.querySelector(".card__imagen-pet");
      const imagen = imagenEl as any;
      imagen.src = this.getAttribute("src");

      const formulario = this.querySelector(".formulario") as any;
      const botonEnviar = this.querySelector(".enviar-reporte");

      modal.style.display = "none";
      reportarInformacion.addEventListener("click", () => {
        modal.style.display = "initial";
      });

      botonCruz.addEventListener("click", () => {
        modal.style.display = "none";
      });

      botonEnviar.addEventListener("click", () => {
        state.setReporteNombre(formulario.nombre.value);
        state.setReporteTelefono(formulario.telefono.value);
        state.setReporteInfo(formulario.informacion.value);
        state.setPetId(this.petId);
        state.setReporteUserId(this.userId);
        state.reportarPetVista(() => {
          formulario.reset();
          modal.style.display = "none";
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
              <p class="reportar-informacion">REPORTAR <br> INFORMACIÓN</p>

              <!-- Modal -->
              <div class="modal">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      
                      <h5 class="modal-title titulo">Reportar info de ${this.nombre}</h5>
                      <form class="formulario">
                        <div class="form-floating mb-3">
                          <input type="email" class="form-control" id="nombre" placeholder="name">
                          <label for="nombre">TU NOMBRE</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input type="email" class="form-control" id="telefono" placeholder="26455555555">
                          <label for="telefono">TU TELÉFONO</label>
                        </div>
                        <label for="informacion">
                          <p>DONDE LO VISTE?</p>
                          <textarea class="form-control informacion__textarea" name="informacion" id="informacion"></textarea>
                        </label>
                      </form>
                      <button class="enviar-reporte">Enviar</button>
                  </div>
                </div>
              </div>
            </div>


          </div>


      `;
      this.appendChild(style);
    }
  }
  customElements.define("card-pet-component", CardPet);
}
