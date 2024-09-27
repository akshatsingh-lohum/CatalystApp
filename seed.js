const prisma = require("./src/config/database");

async function seedCompanies() {
  const demoCompanies = [
    { companyName: "Test: Acme Corp", companyStatus: "ACTIVE" },
    { companyName: "Test: Globex Corporation", companyStatus: "ACTIVE" },
    { companyName: "Test: Soylent Corp", companyStatus: "ACTIVE" },
    { companyName: "Test: Initech", companyStatus: "ACTIVE" },
    {
      companyName: "Test: Test: Umbrella Corporation",
      companyStatus: "ACTIVE",
    },
  ];

  const companies = [];
  for (const company of demoCompanies) {
    const createdCompany = await prisma.company.create({
      data: company,
    });
    companies.push(createdCompany);
  }
  console.log("Seed data for companies inserted successfully.");
  return companies;
}

async function seedDealers(companies) {
  const demoDealers = [
    {
      name: "Test: Dealer A",
      email: "dealera@example.com",
      phone: "1234567890",
      address: "123 Main St",
    },
    {
      name: "Test: Dealer B",
      email: "dealerb@example.com",
      phone: "2345678901",
      address: "456 Elm St",
    },
    {
      name: "Test: Dealer C",
      email: "dealerc@example.com",
      phone: "3456789012",
      address: "789 Oak St",
    },
  ];

  const dealers = [];
  for (let i = 0; i < demoDealers.length; i++) {
    const dealer = demoDealers[i];
    const createdDealer = await prisma.dealer.create({
      data: {
        ...dealer,
        companyID: companies[i % companies.length].id,
      },
    });
    dealers.push(createdDealer);
  }
  console.log("Seed data for dealers inserted successfully.");
  return dealers;
}

async function seedUsers(dealers) {
  const demoUsers = [
    {
      name: "Test: User A",
      email: "usera@example.com",
      phone: "9111111111",
      password: "password123",
      role: "ADMIN",
    },
    {
      name: "Test: User B",
      email: "userb@example.com",
      phone: "9111111112",
      password: "password456",
      role: "USER",
    },
    {
      name: "Test: User C",
      email: "userc@example.com",
      phone: "9111111113",
      password: "password789",
      role: "USER",
    },
  ];

  for (let i = 0; i < demoUsers.length; i++) {
    const user = demoUsers[i];
    await prisma.user.create({
      data: {
        ...user,
        dealerId: dealers[i % dealers.length].id,
      },
    });
  }
  console.log("Seed data for users inserted successfully.");
}

async function seedRequests(companies, dealers) {
  const demoRequests = [
    {
      lotWeightKg: 1000,
      catalystName: "Test: Catalyst A",
      lotID: "LOT001",
      catalystPercent: 2.5,
      catalystWeight: 25,
    },
    {
      lotWeightKg: 1500,
      catalystName: "Test: Catalyst B",
      lotID: "LOT002",
      catalystPercent: 3.0,
      catalystWeight: 45,
    },
    {
      lotWeightKg: 2000,
      catalystName: "Test: Catalyst C",
      lotID: "LOT003",
      catalystPercent: 2.0,
      catalystWeight: 40,
    },
  ];

  for (let i = 0; i < demoRequests.length; i++) {
    const request = demoRequests[i];
    await prisma.request.create({
      data: {
        ...request,
        companyID: companies[i % companies.length].id,
        dealerId: dealers[i % dealers.length].id,
      },
    });
  }
  console.log("Seed data for requests inserted successfully.");
}

async function main() {
  try {
    const companies = await seedCompanies();
    const dealers = await seedDealers(companies);
    await seedUsers(dealers);
    await seedRequests(companies, dealers);
    console.log("All seed data inserted successfully.");
  } catch (e) {
    console.error("Error seeding data:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
