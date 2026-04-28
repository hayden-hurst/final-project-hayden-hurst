import * as service from "../services/financialRecordService.js";

export const createFinancialRecord = async (req, res) => {
  try {
    const record = await service.createFinancialRecord(
      req.user.userId,
      req.body
    );

    res.status(201).json(record);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getFinancialRecords = async (req, res) => {
  try {
    const propertyId = req.query.property_id
      ? Number(req.query.property_id)
      : undefined;

    const records = await service.getFinancialRecords(
      req.user.userId,
      propertyId
    );

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFinancialRecordById = async (req, res) => {
  try {
    const record = await service.getFinancialRecordById(
      Number(req.params.id),
      req.user.userId
    );

    res.json(record);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateFinancialRecord = async (req, res) => {
  try {
    const updated = await service.updateFinancialRecord(
      Number(req.params.id),
      req.user.userId,
      req.body
    );

    res.json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteFinancialRecord = async (req, res) => {
  try {
    const deleted = await service.deleteFinancialRecord(
      Number(req.params.id),
      req.user.userId
    );

    res.json(deleted);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};