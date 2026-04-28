import * as watchlistService from '../services/watchlistService.js';

export const createWatchlistItem = async (req, res) => {
  try {
    const item = await watchlistService.createWatchlistItem(
      req.user.userId,
      req.body
    );

    res.status(201).json(item);

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message
    });
  }
};

export const getAllWatchlistItems = async (req, res) => {
  try {
    const items = await watchlistService.getAllWatchlistItems(
      req.user.userId
    );

    res.json(items);

  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getWatchlistItemById = async (req, res) => {
  try {
    const item = await watchlistService.getWatchlistItemById(
      req.user.userId,
      req.params.id
    );

    res.json(item);

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message
    });
  }
};

export const updateWatchlistItem = async (req, res) => {
  try {
    const item = await watchlistService.updateWatchlistItem(
      req.user.userId,
      req.params.id,
      req.body
    );

    res.json(item);

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message
    });
  }
};

export const deleteWatchlistItem = async (req, res) => {
  try {
    await watchlistService.deleteWatchlistItem(
      req.user.userId,
      req.params.id
    );

    res.json({
      message: 'Watchlist item deleted'
    });

  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message
    });
  }
};
