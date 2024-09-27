const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userController = {
  createUser: async (req, res) => {
    const { name, industry } = req.body;
    try {
      const user = await prisma.user.create({ name, industry });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching user" });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, industry } = req.body;
    try {
      const user = await prisma.user.update(id, { name, industry });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.user.delete(id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  },
};

module.exports = userController;
