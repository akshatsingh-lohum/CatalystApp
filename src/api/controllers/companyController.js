const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const companyController = {
  createCompany: async (req, res) => {
    const { name, industry } = req.body;
    try {
      const company = await prisma.company.create({ name, industry });
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Error creating company" });
    }
  },

  getAllCompany: async (req, res) => {
    try {
      const company = await prisma.company.findMany();
      console.log("getAllCompany started working. Great!");
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Error fetching company" });
    }
  },

  getCompanyById: async (req, res) => {
    const { id } = req.params;
    try {
      const company = await prisma.company.findById(id);
      if (company) {
        res.json(company);
      } else {
        res.status(404).json({ error: "Company not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching company" });
    }
  },

  updateCompany: async (req, res) => {
    const { id } = req.params;
    const { name, industry } = req.body;
    try {
      const company = await prisma.company.update(id, { name, industry });
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Error updating company" });
    }
  },

  deleteCompany: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.company.delete(id);
      res.json({ message: "Company deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting company" });
    }
  },
};

module.exports = companyController;
