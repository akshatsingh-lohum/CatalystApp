const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const requestController = {
  createRequest: async (req, res) => {
    const {
      lotWeightKg,
      catalystName,
      lotID,
      catalystPercent,
      catalystWeight,
      companyID,
      dealerId,
    } = req.body;
    try {
      const request = await prisma.request.create({
        data: {
          lotWeightKg: parseFloat(lotWeightKg),
          catalystName,
          lotID,
          catalystPercent: catalystPercent ? parseFloat(catalystPercent) : null,
          catalystWeight: catalystWeight ? parseFloat(catalystWeight) : null,
          companyID: parseInt(companyID),
          dealerId: parseInt(dealerId),
        },
      });
      res.json(request);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating request", details: error.message });
    }
  },

  getAllRequests: async (req, res) => {
    try {
      const requests = await prisma.request.findMany({
        include: { company: true, dealer: true },
      });
      res.json(requests);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching requests", details: error.message });
    }
  },

  getRequestById: async (req, res) => {
    const { id } = req.params;
    try {
      const request = await prisma.request.findUnique({
        where: { id: parseInt(id) },
        include: { company: true, dealer: true },
      });
      if (request) {
        res.json(request);
      } else {
        res.status(404).json({ error: "Request not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching request", details: error.message });
    }
  },

  updateRequest: async (req, res) => {
    const { id } = req.params;
    const {
      lotWeightKg,
      catalystName,
      lotID,
      catalystPercent,
      catalystWeight,
      companyID,
      dealerId,
    } = req.body;
    try {
      const request = await prisma.request.update({
        where: { id: parseInt(id) },
        data: {
          lotWeightKg: parseFloat(lotWeightKg),
          catalystName,
          lotID,
          catalystPercent: catalystPercent ? parseFloat(catalystPercent) : null,
          catalystWeight: catalystWeight ? parseFloat(catalystWeight) : null,
          companyID: parseInt(companyID),
          dealerId: parseInt(dealerId),
        },
      });
      res.json(request);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating request", details: error.message });
    }
  },

  deleteRequest: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.request.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Request deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting request", details: error.message });
    }
  },
};

module.exports = requestController;
