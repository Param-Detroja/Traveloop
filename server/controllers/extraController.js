const db = require('../config/db');

exports.getBudget = async (req, res) => {
  try {
    const budget = await db.query('SELECT * FROM budgets WHERE trip_id = $1', [req.params.id]);
    res.json(budget.rows[0] || { transport: 0, accommodation: 0, activities: 0, meals: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getChecklist = async (req, res) => {
  try {
    const items = await db.query('SELECT * FROM packing_items WHERE trip_id = $1', [req.params.id]);
    res.json(items.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addChecklistItem = async (req, res) => {
  const { item_name, category } = req.body;
  try {
    const newItem = await db.query(
      'INSERT INTO packing_items (trip_id, item_name, category) VALUES ($1, $2, $3) RETURNING *',
      [req.params.id, item_name, category]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await db.query('SELECT * FROM notes WHERE trip_id = $1 ORDER BY created_at DESC', [req.params.id]);
    res.json(notes.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = await db.query(
      'INSERT INTO notes (trip_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [req.params.id, title, content]
    );
    res.json(newNote.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
