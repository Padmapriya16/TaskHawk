const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');


router.get('/dashboard', authMiddleware, analyticsController.getDashboardAnalytics);


router.get('/weekly-overview', authMiddleware, analyticsController.getWeeklyOverview);


router.get('/productivity', authMiddleware, analyticsController.getProductivityTrends);


router.get('/categories', authMiddleware, analyticsController.getCategoryDistribution);


router.get('/time-distribution', authMiddleware, analyticsController.getTimeDistribution);


router.get('/monthly-trends', authMiddleware, analyticsController.getMonthlyTrends);

module.exports = router;
