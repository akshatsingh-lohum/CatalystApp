const advancedCheckAccess = require("./advancedCheckAccess");

const rbacConfigs = {
  superAdminOrHigher: advancedCheckAccess({ role: ["SUPER_ADMIN"] }),
  companyAdminOrHigher: advancedCheckAccess({
    role: ["COMPANY_ADMIN", "SUPER_ADMIN"],
  }),
  dealerAdminOrHigher: advancedCheckAccess({
    role: ["DEALER_ADMIN", "COMPANY_ADMIN", "SUPER_ADMIN"],
  }),
  dataUploaderOrHigher: advancedCheckAccess({
    role: ["DATA_UPLOAD", "DEALER_ADMIN", "COMPANY_ADMIN", "SUPER_ADMIN"],
  }),
  viewerOrHigher: advancedCheckAccess({
    role: [
      "VIEWER",
      "DATA_UPLOAD",
      "DEALER_ADMIN",
      "COMPANY_ADMIN",
      "SUPER_ADMIN",
    ],
  }),
  userOrHigher: advancedCheckAccess({
    role: [
      "USER",
      "VIEWER",
      "DATA_UPLOAD",
      "DEALER_ADMIN",
      "COMPANY_ADMIN",
      "SUPER_ADMIN",
    ],
  }),

  lohumAccess: advancedCheckAccess({ company: ["Lohum"] }),

  // Add more configurations as needed
};

module.exports = rbacConfigs;
