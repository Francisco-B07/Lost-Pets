import { state } from "../../state";
import { Router } from "@vaadin/router";

class MisDatos extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    const cs = state.getState();
    this.render();

    const inputFullNameEl = this.shadow.querySelector(".fullName") as any;
    if (cs.fullName && cs.token) {
      inputFullNameEl.value = cs.fullName;
    }

    const inputPasswordEl = this.shadow.querySelector(".password") as any;
    const inputRepeatPasswordEl = this.shadow.querySelector(
      ".repeatPassword"
    ) as any;

    const botonEl = this.shadow.querySelector(".btn");

    botonEl?.addEventListener("click", (event) => {
      event.preventDefault();
      if (inputFullNameEl.value != "") {
        state.setFullName(inputFullNameEl.value);
        if (
          cs.token == "" &&
          inputPasswordEl.value == "" &&
          inputRepeatPasswordEl.value == ""
        ) {
          alert("Debe completar todos los campos para continuar");
        } else {
          if (cs.token != "") {
            state.editarUser(inputPasswordEl.value, (err) => {
              if (err) {
                console.error("Hubo un error al actualizar el usuario");
              } else {
                alert("Cambios guardados con exito");
                Router.go("/");
              }
            });
          } else {
            if (inputPasswordEl.value != inputRepeatPasswordEl.value) {
              alert("Las contraseñas ingresadas no coinciden");
            } else {
              state.signup(inputPasswordEl.value, (err) => {
                if (err) {
                  console.error("Hubo un error en el signup");
                } else {
                  alert("Usuario guardado con exito");
                  Router.go("/");
                }
              });
            }
          }
        }
      } else {
        alert("Debe ingresar un nombre para continuar");
      }
    });
  }
  render() {
    const div = document.createElement("div");

    var style = document.createElement("style");
    style.textContent = `
            .titulo{
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 700;
              font-size: 40px;
              line-height: 60px;
              color: #000000;
              margin-top: 44px;
              text-align: center;
              margin-bottom: 44px;
            }
            @media (min-width: 800px){
              .titulo{
                margin-top:50px;
                font-size: 50px;
                text-align:center;
              }
            }
            .btn{
              background: #FF9DF5 !important;
              border-radius: 4px;
              width: 100%;
              height: 50px;
              border: none !important;
              font-family: 'Poppins' !important;
              font-style: normal !important;
              font-weight: 700 !important;
              font-size: 16px !important;
              line-height: 24px !important;
              text-align: center !important;
              color: #000000 !important;
              margin-top: 24px;  
            }
            .input{
              margin-bottom: 34px;
            }         
        `;
    div.innerHTML = `
        <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossorigin="anonymous"
       />
        <div class="container">
          <h1 class="titulo">Mis datos</h1>
          <form>
            <div class="form-floating mb-3">
              <input type="text" class="form-control input fullName" id="floatingInput" placeholder="Juan Perez">
              <label for="floatingInput">NOMBRE</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control input password" id="floatingPassword" placeholder="Password">
              <label for="floatingPassword">CONTRASEÑA</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control input repeatPassword" id="floatingRepetirPassword" placeholder="Password">
              <label for="floatingPassword">REPETIR CONTRASEÑA</label>
            </div>
            <button type="button" class="btn-primary btn boton-mis-datos">Guardar</button>
          </form>
       </div>
        `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("mis-datos-component", MisDatos);
