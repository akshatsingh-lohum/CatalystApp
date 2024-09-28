const express = require("express");
const router = express.Router();
const path = require("path");
const loadRoutesRecursively = require("./routeLoader");

const publicRoutesPath = path.join(__dirname, "public");
loadRoutesRecursively(publicRoutesPath, router);

// Explicitly include auth routes
const authRoutes = require("./public/authRoutes");
router.use("/auth", authRoutes);

module.exports = router;
