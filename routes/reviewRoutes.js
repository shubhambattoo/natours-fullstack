const express = require("express");
const authController = require("./../controllers/authController");
const reviewController = require("./../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protecc,
    authController.restricTo("user"),
    reviewController.createReview
  );

module.exports = router;
