import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import {
  createWatchlistItem,
  deleteWatchlistItem, getAllWatchlistItems,
  getWatchlistItemById,
  updateWatchlistItem
} from '../controllers/watchlistController.js';

const router = express.Router();

router.use(authMiddleware);

router.post("/", createWatchlistItem);
router.get("/", getAllWatchlistItems);
router.get("/:id", getWatchlistItemById);
router.put("/:id", updateWatchlistItem);
router.delete("/:id", deleteWatchlistItem);

export default router;