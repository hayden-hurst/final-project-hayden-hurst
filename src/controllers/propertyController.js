import * as propertyService from "../services/propertyService.js";

export const createProperty = async (req, res) => {
  try {
    const property = await propertyService.createProperty(
      req.user.userId,
      req.body
    );

    res.status(201).json(property);

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || 'Server error'
    });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties(
      req.user.userId
    );

    res.json(properties);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(
      req.user.userId,
      req.params.id
    );

    res.json(property);

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message
    });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await propertyService.updateProperty(
      req.user.userId,
      req.params.id,
      req.body
    );

    res.json(property);

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message
    });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    await propertyService.deleteProperty(
      req.user.userId,
      req.params.id
    );

    res.json({
      message: 'Property deleted'
    });

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message
    });
  }
};