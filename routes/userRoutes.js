const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const Router = express.Router();

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);

Router.post("/forgotPassword", authController.forgotPassword);

Router.post("/resetPassword", authController.resetPassword);

Router.route("/")
  .get(userController.getUsers)
  .post(userController.createUser);

Router.route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
