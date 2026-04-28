import prisma from "../config/prisma.js";

export const createWatchlistItem = async (userId, data) => {
  const { propertyId, targetPrice, notes } = data;

  if (!propertyId) {
    throw { status: 400, message: "propertyId required" };
  }

  const property = await prisma.property.findUnique({
    where: { id: Number(propertyId) },
  });

  if (!property) {
    throw { status: 404, message: "Property not found" };
  }

  const existing = await prisma.watchlistItem.findUnique({
    where: {
      userId_propertyId: {
        userId,
        propertyId: Number(propertyId),
      },
    },
  });

  if (existing) {
    throw { status: 409, message: "Already in watchlist" };
  }

  return prisma.watchlistItem.create({
    data: {
      userId,
      propertyId: Number(propertyId),
      targetPrice,
      notes,
    },
  });
};

export const getAllWatchlistItems = async (userId) => {
  return prisma.watchlistItem.findMany({
    where: { userId },
    include: { property: true },
  });
};

export const getWatchlistItemById = async (userId, id) => {
  const item = await prisma.watchlistItem.findUnique({
    where: { id: Number(id) },
    include: { property: true },
  });

  if (!item) {
    throw { status: 404, message: "Watchlist item not found" };
  }

  if (item.userId !== userId) {
    throw { status: 403, message: "Forbidden" };
  }

  return item;
};

export const updateWatchlistItem = async (userId, id, data) => {
  const item = await prisma.watchlistItem.findUnique({
    where: { id: Number(id) },
  });

  if (!item) {
    throw { status: 404, message: "Watchlist item not found" };
  }

  if (item.userId !== userId) {
    throw { status: 403, message: "Forbidden" };
  }

  return prisma.watchlistItem.update({
    where: { id: Number(id) },
    data: {
      targetPrice: data.targetPrice,
      notes: data.notes,
    },
  });
};

export const deleteWatchlistItem = async (userId, id) => {
  const item = await prisma.watchlistItem.findUnique({
    where: { id: Number(id) },
  });

  if (!item) {
    throw { status: 404, message: "Watchlist item not found" };
  }

  if (item.userId !== userId) {
    throw { status: 403, message: "Forbidden" };
  }

  return prisma.watchlistItem.delete({
    where: { id: Number(id) },
  });
};