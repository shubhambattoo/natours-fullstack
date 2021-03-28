const express = require("express");
const viewController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
// const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.use(viewController.alerts);

router.get("/me", authController.protecc, viewController.getAccount);
router.get("/my-tours", authController.protecc, viewController.getMyTours);
router.post(
  "/submit-user-data",
  authController.protecc,
  viewController.updateUserData
);

router.get("/", authController.isLoggedIn, viewController.getOverview);
router.use(authController.isLoggedIn);
router.get("/tour/:slug", viewController.getTour);
router.get("/login", viewController.getLoginForm);

module.exports = router;
