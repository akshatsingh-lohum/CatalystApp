const express = require("express");
const dealerController = require("../../../controllers/dealerController");
const advancedCheckAccess = require("../../../../../middleware/advancedCheckAccess");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

const {
  checkSameCompany,
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

// Dealer routes with RBAC
router.post("/create", companyAdminOrHigher, dealerController.createDealer);

router.get("/getAll", companyAdminOrHigher, dealerController.getAllDealers);

router.get(
  "/:id",
  companyAdminOrHigher,
  checkSameCompany,
  dealerController.getDealerById
);

router.put(
  "/:id",
  companyAdminOrHigher,
  checkSameCompany,
  dealerController.updateDealer
);

router.delete(
  "/:id",
  companyAdminOrHigher,
  checkSameCompany,
  dealerController.deleteDealer
);

module.exports = router;
