const express = require("express");
const router = express.Router();
const path = require("path");
const loadRoutesRecursively = require("./routeLoader");
const authMiddleware = require("../../../middleware/AuthMiddleware"); // Adjust the path as necessary

router.use(authMiddleware);

const protectedRoutesPath = path.join(__dirname, "protected");
loadRoutesRecursively(protectedRoutesPath, router);

module.exports = router;
