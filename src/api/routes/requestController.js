const express = require("express");
const requestController = require("../controllers/requestController");

const router = express.Router();
// Request routes
router.post("/", requestController.createRequest);
router.get("/", requestController.getAllRequests);
router.get("/:id", requestController.getRequestById);
router.put("/:id", requestController.updateRequest);
router.delete("/:id", requestController.deleteRequest);

module.exports = router; // Make sure you're exporting the router
