const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

// import map from "lodash/map";

type Jugada = "piedra" | "papel" | "tijera" | "" | "nada";

const state = {
  data: {
    email: "",
    fullName: "",
    userExist: false,
    token: "",
  },

  listeners: [],

  init() {
    const localData = localStorage.getItem("state");
    if (localData) {
      this.setState(JSON.parse(localData));
    }
  },

  setEmail(email: string) {
    const cs = this.getState();
    cs.email = email;
    this.setState(cs);
  },
  setFullName(fullName: string) {
    const cs = this.getState();
    cs.fullName = fullName;
    this.setState(cs);
  },
  setUserExist(userExist: string) {
    const cs = this.getState();
    cs.userExist = userExist;
    this.setState(cs);
  },
  setToken(token: string) {
    const cs = this.getState();
    cs.token = token;
    this.setState(cs);
  },

  getState() {
    return this.data;
  },

  ckeckEmail(callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/check/email", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: cs.email }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setUserExist(data.userExist);
        callback();
      });
  },
  signup(password, callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
        fullName: cs.fullName,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        callback();
      });
  },
  signin(password, callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/auth/token", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: cs.email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setToken(data.token);

        callback();
      });
  },

  // signIn(callback) {
  //   const cs = this.getState();
  //   if (cs.currentGame.nombre) {
  //     fetch(API_BASE_URL + "/signin", {
  //       method: "post",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({ nombre: cs.currentGame.nombre }),
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         cs.playerId = data.id;

  //         this.setState(cs);
  //         callback();
  //       });
  //   } else {
  //     console.error("No hay un nombre en el state");
  //     callback(true);
  //   }
  // },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("state", JSON.stringify(newState));
    console.log("El state cambio: ", newState);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
