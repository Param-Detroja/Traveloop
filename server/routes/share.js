const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/:token', async (req, res) => {
  try {
    const tokenData = await db.query('SELECT trip_id FROM share_tokens WHERE token = $1 AND (expires_at IS NULL OR expires_at > NOW())', [req.params.token]);
    if (tokenData.rows.length === 0) return res.status(404).json({ message: 'Invalid or expired share link' });
    
    const tripId = tokenData.rows[0].trip_id;
    const trip = await db.query('SELECT * FROM trips WHERE trip_id = $1', [tripId]);
    const stops = await db.query('SELECT s.*, c.name as city_name FROM stops s JOIN cities c ON s.city_id = c.city_id WHERE trip_id = $1 ORDER BY position ASC', [tripId]);
    
    res.json({ ...trip.rows[0], stops: stops.rows, is_read_only: true });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
