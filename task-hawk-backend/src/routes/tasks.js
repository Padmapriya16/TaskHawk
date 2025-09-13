const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const taskController = require('../controllers/taskController');


router.post('/', authMiddleware, taskController.createTask);


router.get('/', authMiddleware, taskController.getTasks);


router.patch('/:id', authMiddleware, taskController.updateTask);


router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
