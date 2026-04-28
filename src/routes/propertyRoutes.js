import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import {
  createProperty,
  deleteProperty, getAllProperties,
  getPropertyById,
  updateProperty
} from '../controllers/propertyController.js';

const router = express.Router();

router.use(authMiddleware);

router.post("/", createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;