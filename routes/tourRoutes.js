const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");

const Router = express.Router();

// Router.param("id", tourController.checkId);
Router.route("/top-5-cheap").get(
  tourController.aliasTopTours,
  tourController.getTours
);

Router.route("/tour-stats").get(tourController.getTourStats);
Router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

Router.route("/")
  .get(authController.protecc, tourController.getTours)
  .post(tourController.createTour);

Router.route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protecc,
    authController.restricTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = Router;
