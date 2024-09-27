const express = require("express");
const dealerController = require("../controllers/dealerController");

const router = express.Router();

// Dealer routes
router.post("/", dealerController.createDealer);
router.get("/", dealerController.getAllDealers);
router.get("/:id", dealerController.getDealerById);
router.put("/:id", dealerController.updateDealer);
router.delete("/:id", dealerController.deleteDealer);

module.exports = router; // Make sure you're exporting the router
