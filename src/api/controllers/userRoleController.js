const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRoleController = {
  getUserRole: async (req, res) => {
    const { name, industry } = req.body;
    try {
      const user = await prisma.user.create({ name, industry });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  },
};

module.exports = userRoleController;
