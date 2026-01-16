const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const storeController = require("../controllers/store.controller");

router.get(
  "/",
  auth,
  role(["USER"]),
  storeController.getStoresForUser
);

module.exports = router;