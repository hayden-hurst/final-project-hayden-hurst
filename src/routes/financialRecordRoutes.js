import express from "express";

import {
  createFinancialRecord, deleteFinancialRecord,
  getFinancialRecordById,
  getFinancialRecords, updateFinancialRecord
} from '../controllers/financialRecordController.js';

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createFinancialRecord);
router.get("/", getFinancialRecords);
router.get("/:id", getFinancialRecordById);
router.put("/:id", updateFinancialRecord);
router.delete("/:id", deleteFinancialRecord);

export default router;