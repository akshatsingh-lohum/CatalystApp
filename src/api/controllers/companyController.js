const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const companyController = {
  createCompany: async (req, res) => {
    const { companyName, companyStatus } = req.body;
    try {
      const company = await prisma.company.create({
        data: {
          companyName,
          companyStatus,
        },
      });
      res.json(company);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating company", details: error.message });
    }
  },

  getAllCompany: async (req, res) => {
    try {
      const company = await prisma.company.findMany();
      res.json(company);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching company", details: error.message });
    }
  },

  getCompanyById: async (req, res) => {
    const { id } = req.params;
    try {
      const company = await prisma.company.findUnique({
        where: { id: parseInt(id) },
      });
      if (company) {
        res.json(company);
      } else {
        res.status(404).json({ error: "Company not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching company", details: error.message });
    }
  },

  updateCompany: async (req, res) => {
    const { id } = req.params;
    const { companyName, companyStatus } = req.body;
    try {
      const company = await prisma.company.update({
        where: { id: parseInt(id) },
        data: {
          companyName,
          companyStatus,
        },
      });
      res.json(company);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating company", details: error.message });
    }
  },

  deleteCompany: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.company.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Company deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting company", details: error.message });
    }
  },
};

module.exports = companyController;
