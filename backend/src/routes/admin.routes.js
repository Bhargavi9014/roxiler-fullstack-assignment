const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const adminController = require("../controllers/admin.controller");

router.post("/users", auth, role(["ADMIN"]), adminController.addUser);
router.post("/stores", auth, role(["ADMIN"]), adminController.addStore);
router.get("/users", auth, role(["ADMIN"]), adminController.getUsers);
router.get("/stores", auth, role(["ADMIN"]), adminController.getStores);

module.exports = router;