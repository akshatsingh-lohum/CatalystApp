const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const requestController = {
  createRequest: async (req, res) => {
    const { name, industry } = req.body;
    try {
      const request = await prisma.request.create({ name, industry });
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: "Error creating request" });
    }
  },

  getAllRequests: async (req, res) => {
    try {
      const requests = await prisma.request.findAll();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Error fetching requests" });
    }
  },

  getRequestById: async (req, res) => {
    const { id } = req.params;
    try {
      const request = await prisma.request.findById(id);
      if (request) {
        res.json(request);
      } else {
        res.status(404).json({ error: "Request not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching request" });
    }
  },

  updateRequest: async (req, res) => {
    const { id } = req.params;
    const { name, industry } = req.body;
    try {
      const request = await prisma.request.update(id, { name, industry });
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: "Error updating request" });
    }
  },

  deleteRequest: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.request.delete(id);
      res.json({ message: "Request deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting request" });
    }
  },
};

module.exports = requestController;
