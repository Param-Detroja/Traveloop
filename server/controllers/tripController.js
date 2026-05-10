const db = require('../config/db');

exports.getTrips = async (req, res) => {
  try {
    const trips = await db.query('SELECT * FROM trips WHERE user_id = $1 ORDER BY start_date DESC', [req.user.id]);
    res.json(trips.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createTrip = async (req, res) => {
  const { name, start_date, end_date, description, cover_photo_url, is_public } = req.body;
  try {
    const newTrip = await db.query(
      'INSERT INTO trips (user_id, name, start_date, end_date, description, cover_photo_url, is_public) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.user.id, name, start_date, end_date, description, cover_photo_url, is_public]
    );
    res.json(newTrip.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await db.query('SELECT * FROM trips WHERE trip_id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    if (trip.rows.length === 0) return res.status(404).json({ message: 'Trip not found' });
    
    const stops = await db.query('SELECT s.*, c.name as city_name FROM stops s JOIN cities c ON s.city_id = c.city_id WHERE trip_id = $1 ORDER BY position ASC', [req.params.id]);
    
    res.json({ ...trip.rows[0], stops: stops.rows });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    await db.query('DELETE FROM trips WHERE trip_id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
