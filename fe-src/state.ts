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
    ubicacion: "",
    petsCerca: {},
    misPets: {},
    petAEditar: {},
    reporteNombre: "",
    reporteTelefono: "",
    reporteInfo: "",
    petId: 0,
    ruta: "",
  },

  listeners: [],

  init() {
    const localData = localStorage.getItem("state");
    if (localData) {
      this.setState(JSON.parse(localData));
    }
  },

  setRuta(ruta: string) {
    const cs = this.getState();
    cs.ruta = ruta;
    this.setState(cs);
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
  setUbicacion(ubicacion: string) {
    const cs = this.getState();
    cs.ubicacion = ubicacion;
    this.setState(cs);
  },
  setNamePet(namePet: string) {
    const cs = this.getState();
    cs.namePet = namePet;
    this.setState(cs);
  },
  setPetsCerca(petsCerca: any) {
    const cs = this.getState();
    cs.petsCerca = petsCerca;
    this.setState(cs);
  },
  setMisPets(misPets: any) {
    const cs = this.getState();
    cs.misPets = misPets;
    this.setState(cs);
  },
  setPetAEditar(petAEditar: any) {
    const cs = this.getState();
    cs.petAEditar = petAEditar;
    this.setState(cs);
  },
  setReporteNombre(reporteNombre: string) {
    const cs = this.getState();
    cs.reporteNombre = reporteNombre;
    this.setState(cs);
  },
  setReporteTelefono(reporteTelefono: string) {
    const cs = this.getState();
    cs.reporteTelefono = reporteTelefono;
    this.setState(cs);
  },
  setReporteInfo(reporteInfo: string) {
    const cs = this.getState();
    cs.reporteInfo = reporteInfo;
    this.setState(cs);
  },
  setPetId(petId: string) {
    const cs = this.getState();
    cs.petId = petId;
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
        callback();
      });
  },

  editarUser(password, callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/user", {
      method: "put",
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
  reportarPet(imageDataURL: string, callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/pets", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: "bearer " + cs.token,
      },
      body: JSON.stringify({
        name: cs.namePet,
        lat: cs.lat,
        lng: cs.lng,
        ubicacion: cs.ubicacion,
        imageDataURL: imageDataURL,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback();
      });
  },
  editarPetPerdida(imageDataURL: string, callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/pets/" + cs.petAEditar.id, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "bearer " + cs.token,
      },
      body: JSON.stringify({
        name: cs.namePet,
        lat: cs.lat,
        lng: cs.lng,
        ubicacion: cs.ubicacion,
        imageDataURL: imageDataURL,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback();
      });
  },
  reportarPetVista(callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/reporte", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        reporteNombre: cs.reporteNombre,
        reporteTelefono: cs.reporteTelefono,
        reporteInfo: cs.reporteInfo,
        petId: cs.petId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
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
        this.setPetsCerca(data);

        callback();
      })
      .catch((e) => {
        console.log(e);
      });
  },
  buscarMisPets(callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/me/pets", {
      headers: {
        Authorization: "bearer " + cs.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setMisPets(data);
        callback();
      })
      .catch((e) => {
        console.log(e);
      });
  },
  buscarPetAEditar(petId, callback) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/pets/" + petId, {
      headers: {
        Authorization: "bearer " + cs.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setPetAEditar(data);

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
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
