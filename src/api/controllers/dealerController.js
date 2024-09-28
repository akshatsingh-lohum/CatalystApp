const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dealerController = {
  createDealer: async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
      const newDealer = await prisma.dealer.create({
        data: {
          name,
          email,
          phone,
          address,
          companyID: req.userCompany.id, // Assuming req.userCompany is set by middleware
        },
      });
      res.status(201).json(newDealer);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating dealer", details: error.message });
    }
  },

  getAllDealers: async (req, res) => {
    try {
      const dealers = await prisma.dealer.findMany({
        where: { companyID: req.userCompany.id },
      });
      res.json(dealers);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching dealers", details: error.message });
    }
  },

  getDealerById: async (req, res) => {
    const { id } = req.params;
    try {
      const dealer = await prisma.dealer.findUnique({
        where: { id: parseInt(id) },
        include: { company: true },
      });
      if (dealer && dealer.companyID === req.userCompany.id) {
        res.json(dealer);
      } else {
        res.status(404).json({ error: "Dealer not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching dealer", details: error.message });
    }
  },

  updateDealer: async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    try {
      const dealer = await prisma.dealer.update({
        where: {
          id: parseInt(id),
          companyID: req.userCompany.id,
        },
        data: {
          name,
          email,
          phone,
          address,
        },
      });
      res.json(dealer);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating dealer", details: error.message });
    }
  },

  deleteDealer: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.dealer.delete({
        where: {
          id: parseInt(id),
          companyID: req.userCompany.id,
        },
      });
      res.json({ message: "Dealer deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting dealer", details: error.message });
    }
  },
};

module.exports = dealerController;
