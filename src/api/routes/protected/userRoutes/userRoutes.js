const express = require("express");
const userController = require("../../../controllers/userController");
const attachUserInfo = require("../../../../../middleware/attachUserInfo");

const router = express.Router();

const {
  checkSameUser,
  checkSameCompany,
  checkSameDealerViaUserId,
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

// User routes
router.post("/create", dealerAdminOrHigher, userController.createUser);
router.get("/getAll", dealerAdminOrHigher, userController.getAllUsers);
router.get(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealerViaUserId,
  userController.getUserById
);
router.put(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealerViaUserId,
  userController.updateUser
);
router.delete(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealerViaUserId,
  userController.deleteUser
);

module.exports = router; // Make sure you're exporting the router
