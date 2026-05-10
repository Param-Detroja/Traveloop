const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Search cities
router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    const cities = await db.query('SELECT * FROM cities WHERE name ILIKE $1 ORDER BY popularity DESC', [`%${q}%`]);
    res.json(cities.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get activities for a city
router.get('/activities', async (req, res) => {
  const { city_id } = req.query;
  try {
    const activities = await db.query('SELECT * FROM activities WHERE city_id = $1', [city_id]);
    res.json(activities.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
