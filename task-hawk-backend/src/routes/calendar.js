const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const calendarController = require('../controllers/calendarController');


router.post('/events', authMiddleware, calendarController.createEvent);


router.get('/events', authMiddleware, calendarController.getEvents);


router.put('/events/:id', authMiddleware, calendarController.updateEvent);


router.delete('/events/:id', authMiddleware, calendarController.deleteEvent);

module.exports = router;
