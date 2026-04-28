import prisma from "../config/prisma.js";

export const verifyPropertyOwnership = async (propertyId, userId) => {
  const property = await prisma.property.findUnique({
    where: { id: Number(propertyId) },
  });

  if (!property) {
    const error = new Error("Property not found");
    error.status = 404;
    throw error;
  }

  if (property.userId !== userId) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  return property;
};

export const createFinancialRecord = async (userId, data) => {
  await verifyPropertyOwnership(data.propertyId, userId);

  return prisma.financialRecord.create({
    data: {
      propertyId: Number(data.propertyId),
      type: data.type,
      category: data.category,
      amount: data.amount,
      date: new Date(data.date),
      notes: data.notes,
    },
  });
};

export const getFinancialRecords = async (userId, propertyId) => {
  return prisma.financialRecord.findMany({
    where: {
      property: {
        userId,
        ...(propertyId && { id: Number(propertyId) }),
      },
    },
    include: {
      property: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

export const getFinancialRecordById = async (id, userId) => {
  const record = await prisma.financialRecord.findUnique({
    where: { id: Number(id) },
    include: { property: true },
  });

  if (!record) {
    const error = new Error("Financial record not found");
    error.status = 404;
    throw error;
  }

  if (record.property.userId !== userId) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  return record;
};

export const updateFinancialRecord = async (id, userId, data) => {
  const record = await prisma.financialRecord.findUnique({
    where: { id: Number(id) },
    include: { property: true },
  });

  if (!record) {
    const error = new Error("Financial record not found");
    error.status = 404;
    throw error;
  }

  if (record.property.userId !== userId) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  return prisma.financialRecord.update({
    where: { id: Number(id) },
    data: {
      type: data.type,
      category: data.category,
      amount: data.amount,
      date: data.date ? new Date(data.date) : undefined,
      notes: data.notes,
    },
  });
};

export const deleteFinancialRecord = async (id, userId) => {
  const record = await prisma.financialRecord.findUnique({
    where: { id: Number(id) },
    include: { property: true },
  });

  if (!record) {
    const error = new Error("Financial record not found");
    error.status = 404;
    throw error;
  }

  if (record.property.userId !== userId) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  return prisma.financialRecord.delete({
    where: { id: Number(id) },
  });
};