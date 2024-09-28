const express = require("express");
const requestController = require("../../../controllers/requestController");
const advancedCheckAccess = require("../../../../../middleware/advancedCheckAccess");

const router = express.Router();

const {
  checkSameUser,
  checkSameCompany,
  checkSameDealer,
} = require("../../../../../middleware/sameEntityCheck");

const {
  superAdminOrHigher,
  companyAdminOrHigher,
  dealerAdminOrHigher,
  dataUploaderOrHigher,
  viewerOrHigher,
  userOrHigher,
  lohumAccess,
} = require("../../../../../middleware/rbacConfigs");

router.use(attachUserInfo);

// Request routes
router.post("/create", dealerAdminOrHigher, requestController.createRequest);
router.get("/getAll", dealerAdminOrHigher, requestController.getAllRequests);
router.get(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealer,
  requestController.getRequestById
);
router.put(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealer,
  requestController.updateRequest
);
router.delete(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealer,
  requestController.deleteRequest
);

module.exports = router; // Make sure you're exporting the router
