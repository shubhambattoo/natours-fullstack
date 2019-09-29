const express = require("express");
const tourController = require("./../controllers/tourController");

const Router = express.Router();

// Router.param("id", tourController.checkId);
Router.route("/top-5-cheap").get(
  tourController.aliasTopTours,
  tourController.getTours
);

Router.route("/")
  .get(tourController.getTours)
  .post(tourController.createTour);

Router.route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = Router;
