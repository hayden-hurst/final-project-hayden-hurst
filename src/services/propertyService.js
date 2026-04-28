import prisma from "../config/prisma.js";

export const createProperty = async (userId, data) => {
  const {
    address,
    city,
    state,
    propertyType,
    status,
    purchasePrice,
  } = data;

  if (
    !address ||
    !city ||
    !state ||
    !propertyType ||
    !status ||
    purchasePrice == null
  ) {
    throw { status: 400, message: "All fields required" };
  }

  return prisma.property.create({
    data: {
      userId,
      address,
      city,
      state,
      propertyType,
      status,
      purchasePrice: Number(purchasePrice),
    },
  });
};

export const getAllProperties = async (userId) => {
  return prisma.property.findMany({
    where: { userId },
  });
};

export const getPropertyById = async (userId, id) => {
  const property = await prisma.property.findUnique({
    where: { id: Number(id) },
  });

  if (!property) {
    throw { status: 404, message: "Property not found" };
  }

  if (property.userId !== userId) {
    throw { status: 403, message: "Forbidden" };
  }

  return property;
};

export const updateProperty = async (userId, id, data) => {
  const property = await prisma.property.findUnique({
    where: { id: Number(id) },
  });

  if (!property) {
    throw { status: 404, message: "Property not found" };
  }

  if (property.userId !== userId) {
    throw { status: 403, message: "Forbidden" };
  }

  // 🔥 prevent accidental userId overwrite
  const { userId: _, id: __, ...safeData } = data;

  return prisma.property.update({
    where: { id: Number(id) },
    data: safeData,
  });
};

export const deleteProperty = async (userId, id) => {
  const property = await prisma.property.findUnique({
    where: { id: Number(id) },
  });

  if (!property) {
    throw { status: 404, message: "Property not found" };
  }

  if (property.userId !== userId) {
    throw { status: 403, message: "Forbidden" };
  }

  return prisma.property.delete({
    where: { id: Number(id) },
  });
};