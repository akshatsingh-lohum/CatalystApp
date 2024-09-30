const express = require("express");
const {
  login,
  signup,
  forgotPassword,
} = require("../../controllers/authController");
const advancedCheckAccess = require("../../../../middleware/advancedCheckAccess");

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);

// Protected route
// router.get("/profile", advancedCheckAccess, getProfile);

module.exports = router;
