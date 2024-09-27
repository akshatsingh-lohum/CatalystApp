const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dealerController = {
  createDealer: async (req, res) => {
    const { name, industry } = req.body;
    try {
      const dealer = await prisma.dealer.create({ name, industry });
      res.json(dealer);
    } catch (error) {
      res.status(500).json({ error: "Error creating dealer" });
    }
  },

  getAllDealers: async (req, res) => {
    try {
      const dealers = await prisma.dealer.findAll();
      res.json(dealers);
    } catch (error) {
      res.status(500).json({ error: "Error fetching dealers" });
    }
  },

  getDealerById: async (req, res) => {
    const { id } = req.params;
    try {
      const dealer = await prisma.dealer.findById(id);
      if (dealer) {
        res.json(dealer);
      } else {
        res.status(404).json({ error: "Dealer not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching dealer" });
    }
  },

  updateDealer: async (req, res) => {
    const { id } = req.params;
    const { name, industry } = req.body;
    try {
      const dealer = await prisma.dealer.update(id, { name, industry });
      res.json(dealer);
    } catch (error) {
      res.status(500).json({ error: "Error updating dealer" });
    }
  },

  deleteDealer: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.dealer.delete(id);
      res.json({ message: "Dealer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting dealer" });
    }
  },
};

module.exports = dealerController;
