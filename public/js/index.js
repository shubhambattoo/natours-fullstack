/* eslint-disable */
import "@babel/polyfill";
import { login, logout } from "./login";
import { displayMap } from "./mapbox";
import { updateData, updateSettings } from "./updateSettings";

// DOM ELEMENTS
const mapBox = document.getElementById("map");
const loginForm = document.querySelector("#login-form");
const userDataForm = document.querySelector("#user-form");
const userPasswordForm = document.querySelector("#pasword-form");
const logoutBtn = document.querySelector(".nav__el--logout");

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  // console.log(locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    e.preventDefault();
    login(email, password);
  });
}

if (userDataForm) {
  userDataForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const photo = document.getElementById("photo").files[0];

    formData.append("name", name);
    formData.append("email", email);
    formData.append("photo", photo);

    updateSettings(formData, "data");
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async e => {
    e.preventDefault();
    const passworCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passworConfirm = document.getElementById("password-confirm").value;
    await updateSettings({ password, passworCurrent, passworConfirm }, "data");

    document.getElementById("password").value = "";
    document.getElementById("password-current").value = "";
    document.getElementById("password-confirm").value = "";
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
