/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    // console.log(email, password);
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      data: {
        email,
        password
      }
    });
    // console.log(res);
    if (res.data.status === "success") {
      showAlert("success", "User logged in!!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/users/logout");

    if (res.data.status === "success") {
      window.location.reload(true);
    }
  } catch (error) {
    console.log(error);
    showAlert("error", "some error occured");
  }
};
