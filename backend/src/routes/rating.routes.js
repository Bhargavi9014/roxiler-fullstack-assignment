const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const ratingController = require("../controllers/rating.controller");

router.post(
  "/",
  auth,
  role(["USER"]),
  ratingController.submitRating
);

module.exports = router;