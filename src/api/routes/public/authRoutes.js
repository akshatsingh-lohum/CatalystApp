const express = require("express");
const { login, signup } = require("../../controllers/authController");
const advancedCheckAccess = require("../../../../middleware/advancedCheckAccess");

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/signup", signup);

// Protected route
// router.get("/profile", advancedCheckAccess, getProfile);

module.exports = router;
