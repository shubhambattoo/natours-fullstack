const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

// Router.param("id", tourController.checkId);
// router
//   .route("/:tourId/reviews")
//   .post(
//     authController.protecc,
//     authController.restricTo("user"),
//     reviewController.createReview
//   );

router.use("/:tourId/reviews", reviewRouter);

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getTours);

router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protecc,
    authController.restricTo("admin", "lead-guides", "guides"),
    tourController.getMonthlyPlan
  );

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances);

router
  .route("/")
  .get(tourController.getTours)
  .post(
    authController.protecc,
    authController.restricTo("admin", "lead-guides"),
    tourController.createTour
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protecc,
    authController.restricTo("admin", "lead-guides"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protecc,
    authController.restricTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;
