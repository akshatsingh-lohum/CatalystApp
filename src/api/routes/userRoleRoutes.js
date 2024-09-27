// /user-role
const express = require("express");
const userRoleController = require("../controllers/userRoleController");

const router = express.Router();
// User routes
router.get("/", userRoleController.getUserRole);

module.exports = router; // Make sure you're exporting the router
