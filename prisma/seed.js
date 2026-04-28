import "dotenv/config";
import prisma from "../src/config/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  console.log("Starting seed...");

  await prisma.watchlistItem.deleteMany();
  await prisma.financialRecord.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("Password123!", 10);

  const ownerUser = await prisma.user.create({
    data: {
      name: "Owner User",
      email: "owner@example.com",
      password: hashedPassword,
    },
  });

  const investorUser = await prisma.user.create({
    data: {
      name: "Investor User",
      email: "investor@example.com",
      password: hashedPassword,
    },
  });

  const property1 = await prisma.property.create({
    data: {
      userId: ownerUser.id,
      address: "123 Main St",
      city: "Charlotte",
      state: "NC",
      propertyType: "Single Family",
      status: "owned",
      purchasePrice: 250000,
    },
  });

  const property2 = await prisma.property.create({
    data: {
      userId: investorUser.id,
      address: "456 Oak Ave",
      city: "Raleigh",
      state: "NC",
      propertyType: "Condo",
      status: "evaluating",
      purchasePrice: 180000,
    },
  });

  await prisma.financialRecord.createMany({
    data: [
      {
        propertyId: property1.id,
        type: "income",
        category: "Rent",
        amount: 1800,
        date: new Date("2025-03-01"),
        notes: "March rent payment",
      },
      {
        propertyId: property1.id,
        type: "expense",
        category: "Repair",
        amount: 300,
        date: new Date("2025-03-05"),
        notes: "Plumbing repair",
      },
    ],
  });

  await prisma.watchlistItem.create({
    data: {
      userId: ownerUser.id,
      propertyId: property2.id,
      targetPrice: 175000,
      notes: "Good location, wait for price drop",
    },
  });

  console.log("Seed complete!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });