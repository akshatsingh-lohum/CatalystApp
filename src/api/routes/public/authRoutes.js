const express = require("express");
const {
  register,
  login,
  getProfile,
  signup,
} = require("../../controllers/authController");
const advancedCheckAccess = require("../../../../middleware/advancedCheckAccess");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/signup", signup);

// Protected route
router.get("/profile", advancedCheckAccess, getProfile);

module.exports = router;
