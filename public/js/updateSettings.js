/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const updateData = async (name, email) => {
  try {
    const res = await axios.patch(
      "/api/v1/users/updateMe",
      {
        name,
        email
      }
    );

    if (res.data.status === "success") {
      showAlert("success", "Data updated successfully");
    }
  } catch (error) {
    console.log(error);
    showAlert("error", error.response.message);
  }
};

/**
 *
 * @param {*} data
 * @param {*} type it is either "password" or "data"
 */
export const updateSettings = async (data, type) => {
  try {
    const uri =
      type === "data"
        ? "/api/v1/users/updateMe"
        : "/api/v1/users/updateMyPassword";

    const res = await axios.patch(uri, data);

    if (res.data.status === "success") {
      showAlert("success", "Data updated successfully");
    }
  } catch (error) {
    console.log(error);
    showAlert("error", error.response.message);
  }
};
