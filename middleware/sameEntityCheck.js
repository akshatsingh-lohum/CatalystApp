const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkSameCompany = async (req, res, next) => {
  try {
    const dealerId = req.params.id;
    const userCompanyId = req.userCompany.id;

    // Fetch the dealer to get their company ID
    const dealer = await prisma.dealer.findUnique({
      where: { id: dealerId },
      select: { companyID: true },
    });

    if (!dealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }

    if (
      req.fullUser.role === "SUPER_ADMIN" ||
      userCompanyId === dealer.companyID
    ) {
      next();
    } else {
      res.status(403).json({ message: "Access denied: Not the same company" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking company access", error: error.message });
  }
};

const checkSameDealer = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const userDealerId = req.userDealer.id;

    if (req.fullUser.role === "SUPER_ADMIN") {
      return next();
    }

    // Fetch the dealer information for both the requesting user and the requested dealer
    const [userDealer, requestedDealer] = await Promise.all([
      prisma.dealer.findUnique({
        where: { id: userDealerId },
        include: { company: true },
      }),
      prisma.dealer.findUnique({
        where: { id: requestId },
        include: { company: true },
      }),
    ]);

    if (!userDealer || !requestedDealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }

    // Check if the user's dealer ID matches the requested dealer ID
    if (userDealerId === requestId) {
      return next();
    }

    res.status(403).json({ message: "Access denied: Not the same dealer" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking dealer access", error: error.message });
  }
};

const checkSameUser = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const currentUser = req.fullUser; // Assuming this contains the full user object including role and dealerId

    // Check if the user is a SUPER_ADMIN, who can access any request
    if (currentUser.role === "SUPER_ADMIN") {
      return next();
    }

    // Fetch the request with its associated dealer and company
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        dealer: true,
        company: true,
      },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if the user is a COMPANY_ADMIN and the request belongs to their company
    if (
      currentUser.role === "COMPANY_ADMIN" &&
      currentUser.dealer.companyID === request.companyID
    ) {
      return next();
    }

    // Check if the user is a DEALER_ADMIN or other role and the request belongs to their dealer
    if (currentUser.dealerId === request.dealerId) {
      return next();
    }

    // If none of the conditions are met, deny access
    res.status(403).json({
      message: "Access denied: Not authorized to access this request",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking user access", error: error.message });
  }
};

const checkSameDealerViaUserId = async (req, res, next) => {
  try {
    const requestedUserId = req.params.id;
    const currentUser = req.fullUser; // Assuming this contains the full user object including role and dealerId

    // Check if the user is a SUPER_ADMIN or COMPANY_ADMIN, who can access any user
    if (["SUPER_ADMIN", "COMPANY_ADMIN"].includes(currentUser.role)) {
      return next();
    }

    // Fetch the requested user with their dealer information
    const requestedUser = await prisma.user.findUnique({
      where: { id: requestedUserId },
      include: { dealer: true },
    });

    if (!requestedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current user and requested user belong to the same dealer
    if (currentUser.dealerId === requestedUser.dealerId) {
      return next();
    }

    // If the current user is a DEALER_ADMIN, check if both users belong to the same company
    if (currentUser.role === "DEALER_ADMIN") {
      const currentUserDealer = await prisma.dealer.findUnique({
        where: { id: currentUser.dealerId },
        select: { companyID: true },
      });

      if (
        currentUserDealer &&
        currentUserDealer.companyID === requestedUser.dealer.companyID
      ) {
        return next();
      }
    }

    // If none of the conditions are met, deny access
    res.status(403).json({
      message:
        "Access denied: Not authorized to access this user's information",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking user access", error: error.message });
  }
};

module.exports = {
  checkSameCompany,
  checkSameDealer,
  checkSameUser,
  checkSameDealerViaUserId,
};
