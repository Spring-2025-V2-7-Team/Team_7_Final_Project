const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const userController = require("../controllers/userController");

router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);
router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", userController.getUserById);

module.exports = router;