import { state } from "../../state";
import { Router } from "@vaadin/router";

class Password extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    const cs = state.getState();

    this.render();
    const inputEl = this.shadow.querySelector(".form-control");
    const input = inputEl as any;

    var botonEl = this.shadow.querySelector(".btn");

    botonEl?.addEventListener("click", () => {
      if (input.value !== "") {
        state.signin(input.value, (err) => {
          if (err) {
            console.error("Hubo un error en el signup");
          } else {
            alert("Login exitoso");

            Router.go("/" + cs.ruta);
          }
        });
      } else {
        alert("Debe ingresar un email para continuar");
      }
    });
  }
  render() {
    const div = document.createElement("div");

    var style = document.createElement("style");
    style.textContent = `
            @media (min-width: 800px){
              .container{
                width: 40vw !important;
                margin-left:30vw;
              }
            }
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
            .link-recuperar-password{
              color: #40AFFF;
              display: flex;
              margin-top: 6px;
              justify-content: center;
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
          <h1 class="titulo">Ingresar</h1>
          <form >
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
              <label for="floatingPassword">CONTRASEÑA</label>
            </div>
            <a href="" class="link-recuperar-password">OLVIDÉ MI CONTRASEÑA</a>
            <button type="button" class="btn-primary btn">Ingresar</button>
          </form>
       </div>
        `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("password-component", Password);
