const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const extraController = require('../controllers/extraController');
const auth = require('../middleware/auth');

// Base Trip CRUD
router.get('/', auth, tripController.getTrips);
router.post('/', auth, tripController.createTrip);
router.get('/:id', auth, tripController.getTripById);
router.delete('/:id', auth, tripController.deleteTrip);

// Budget, Checklist, Notes
router.get('/:id/budget', auth, extraController.getBudget);
router.get('/:id/checklist', auth, extraController.getChecklist);
router.post('/:id/checklist', auth, extraController.addChecklistItem);
router.get('/:id/notes', auth, extraController.getNotes);
router.post('/:id/notes', auth, extraController.addNote);

module.exports = router;
