const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRoleController = {
  getUserRole: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: { role: true },
      });
      if (user) {
        res.json({ role: user.role });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching user role", details: error.message });
    }
  },

  updateUserRole: async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { role },
        select: { id: true, name: true, role: true },
      });
      res.json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating user role", details: error.message });
    }
  },

  getAllRoles: async (req, res) => {
    res.json(Object.values(prisma.USER_ROLE));
  },
};

module.exports = userRoleController;
