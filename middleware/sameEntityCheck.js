import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const checkSameCompany = async (req, res, next) => {
  try {
    const dealerId = parseInt(req.params.id);
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
    const dealerId = parseInt(req.params.id);
    const userDealerId = req.userDealer.id;

    if (req.fullUser.role === "SUPER_ADMIN" || userDealerId === dealerId) {
      next();
    } else {
      res.status(403).json({ message: "Access denied: Not the same dealer" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking dealer access", error: error.message });
  }
};

const checkSameUser = async (req, res, next) => {
  try {
    const targetUserId = parseInt(req.params.id);
    const currentUserId = req.fullUser.id;

    // Define roles that can access any user's information
    const superiorRoles = ["SUPER_ADMIN"];

    if (
      superiorRoles.includes(req.fullUser.role) ||
      currentUserId === targetUserId
    ) {
      next();
    } else {
      res.status(403).json({
        message:
          "Access denied: Not authorized to access this user's information",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking user access", error: error.message });
  }
};

export { checkSameCompany, checkSameDealer, checkSameUser };
