const express = require("express");
const companyController = require("../../../controllers/companyController");
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

// Way to write with a middleware
// // Define role and company constants
// const ADMIN = "admin";
// const MANAGER = "manager";
// const USER = "user";
// const COMPANY_A = "companyA";
// const COMPANY_B = "companyB";

// Routes accessible only to admins and managers of COMPANY_A
// router.post(
//   "/create",
//   advancedCheckAccess({
//     role: [ADMIN, MANAGER],
//     company: [COMPANY_A],
//   }),
//   companyController.createCompany
// );

router.get("/getAll", superAdminOrHigher, companyController.getAllCompany);

router.post("/create", superAdminOrHigher, companyController.createCompany);

router.delete("/:id", superAdminOrHigher, companyController.deleteCompany);

router.post("/create", superAdminOrHigher, companyController.createCompany);

router.get("/:id", superAdminOrHigher, companyController.getCompanyById);

module.exports = router;
