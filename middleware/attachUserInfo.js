const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const attachUserInfo = async (req, res, next) => {
  try {
    // Assuming you have a user object attached to the request after authentication
    const userId = req.user.id;

    // Fetch the user's complete information from the database using Prisma
    const userWithRelations = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        dealer: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!userWithRelations) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user, dealer, and company information to the request object
    req.fullUser = userWithRelations;
    req.userDealer = userWithRelations.dealer;
    req.userCompany = userWithRelations.dealer.company;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user information",
      error: error.message,
    });
  }
};

module.exports = attachUserInfo;
