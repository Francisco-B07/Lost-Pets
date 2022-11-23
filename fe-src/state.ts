const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

// import map from "lodash/map";

const state = {
  data: {
    email: "",
    fullName: "",
    userExist: false,
    token: "",
    lng: 0,
    lat: 0,
    namePet: "",
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
  setLng(lng: number) {
    const cs = this.getState();
    cs.lng = lng;
    this.setState(cs);
  },
  setLat(lat: number) {
    const cs = this.getState();
    cs.lat = lat;
    this.setState(cs);
  },
  setNamePet(namePet: string) {
    const cs = this.getState();
    cs.namePet = namePet;
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
  reportarPet(callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/pets", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: cs.namePet,
        lat: cs.lat,
        lng: cs.lng,
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
  buscarPetsCerca(callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/pets-cerca-de?lat=" + cs.lat + "&lng=" + cs.lng)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        callback();
      })
      .catch((e) => {
        console.log(e);
      });
  },

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
