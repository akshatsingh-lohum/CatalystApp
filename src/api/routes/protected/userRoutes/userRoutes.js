const express = require("express");
const userController = require("../../../controllers/userController");

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

// User routes
router.post("/create", dealerAdminOrHigher, userController.createUser);
router.get("/getAll", dealerAdminOrHigher, userController.getAllUsers);
router.get(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealer,
  userController.getUserById
);
router.put(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealer,
  userController.updateUser
);
router.delete(
  "/:id",
  dealerAdminOrHigher,
  checkSameDealer,
  userController.deleteUser
);

module.exports = router; // Make sure you're exporting the router
