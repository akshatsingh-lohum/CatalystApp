const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userController = {
  createUser: async (req, res) => {
    const { name, email, phone, password, dealerId, role } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password, // Note: In a real application, you should hash the password before storing it
          dealerId: parseInt(dealerId),
          role,
        },
      });
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating user", details: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        include: { dealer: true },
      });
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching users", details: error.message });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { dealer: true },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching user", details: error.message });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, dealerId, role } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          phone,
          password, // Note: In a real application, you should hash the password before updating it
          dealerId: parseInt(dealerId),
          role,
        },
      });
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating user", details: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting user", details: error.message });
    }
  },
};

module.exports = userController;
