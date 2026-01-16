const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const storeOwnerController = require("../controllers/storeOwner.controller");

router.get(
  "/dashboard",
  auth,
  role(["STORE_OWNER"]),
  storeOwnerController.getStoreDashboard
);

module.exports = router;