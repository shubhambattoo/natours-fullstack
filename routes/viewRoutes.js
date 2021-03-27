const express = require("express");
const viewController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/me", authController.protecc, viewController.getAccount);
router.post(
  "/submit-user-data",
  authController.protecc,
  viewController.updateUserData
);

router.use(authController.isLoggedIn);
router.get("/", viewController.getOverview);
router.get("/tour/:slug", viewController.getTour);
router.get("/login", viewController.getLoginForm);

module.exports = router;
