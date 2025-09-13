const Task = require('../models/Task');
const mongoose = require('mongoose'); 

const getWeekRange = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)); 
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return { startOfWeek, endOfWeek };
};

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const allTasks = await Task.find({ user: userId });
    const tasksCreatedToday = allTasks.filter(task => task.createdAt >= today && task.createdAt < tomorrow);
    const completedTasksToday = tasksCreatedToday.filter(task => task.completed).length;
    const totalTasksToday = tasksCreatedToday.length;

    // Calculate streak 
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    
    
    for (let i = 0; i < 365; i++) { 
      const dayToCheck = new Date(currentDate);
      dayToCheck.setDate(currentDate.getDate() - i);
      dayToCheck.setHours(0, 0, 0, 0);
      const nextDay = new Date(dayToCheck);
      nextDay.setDate(dayToCheck.getDate() + 1);

      const tasksCompletedOnDay = await Task.countDocuments({
        user: userId,
        completed: true,
        
        createdAt: { $gte: dayToCheck, $lt: nextDay } 
      });

      if (tasksCompletedOnDay > 0) {
        streak++;
      } else if (i > 0) {
        break;
      }
      if (i === 0 && tasksCompletedOnDay === 0) {
        streak = 0;
        break;
      }
    }


    res.json({
      todayProgress: totalTasksToday > 0 ? Math.round((completedTasksToday / totalTasksToday) * 100) : 0,
      streak: streak,
      mood: 'productive',
      completedTasks: allTasks.filter(t => t.completed).length,
      totalTasks: allTasks.length,
      userName: req.user.name
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getWeeklyOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startOfWeek, endOfWeek } = getWeekRange(new Date());

    const tasksInWeek = await Task.find({
      user: userId,
      createdAt: { $gte: startOfWeek, $lt: endOfWeek }
    });

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = days.map(dayName => {
      const taskDay = new Date(startOfWeek); 
      let currentDayIndex = days.indexOf(dayName);
      taskDay.setDate(startOfWeek.getDate() + currentDayIndex);
      taskDay.setHours(0,0,0,0);
      const nextDay = new Date(taskDay);
      nextDay.setDate(taskDay.getDate() + 1);

      const tasksOnThisDay = tasksInWeek.filter(task => {
        return task.createdAt >= taskDay && task.createdAt < nextDay;
      });

      return {
        day: dayName,
        completed: tasksOnThisDay.filter(t => t.completed).length,
        pending: tasksOnThisDay.filter(t => !t.completed).length,
      };
    });
    res.json(weeklyData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProductivityTrends = async (req, res) => {
  try {
    const userId = req.user.id;
    const period = req.query.period || '7d'; 

    let daysToLookBack = 7;
    if (period === '30d') daysToLookBack = 30;
    if (period === '90d') daysToLookBack = 90;

    const productivityData = [];
    for (let i = daysToLookBack - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      const tasksOnDay = await Task.find({
        user: userId,
        createdAt: { $gte: date, $lt: nextDay }
      });

      const completed = tasksOnDay.filter(t => t.completed).length;
      const total = tasksOnDay.length;
      const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;

      productivityData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        productivity,
        completed,
        total
      });
    }
    res.json(productivityData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getCategoryDistribution = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryDistribution = await Task.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } }, 
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { name: '$_id', value: '$count', _id: 0 } },
      { $sort: { value: -1 } }
    ]);

    const totalTasks = await Task.countDocuments({ user: userId });
    const formattedDistribution = categoryDistribution.map(cat => ({
      ...cat,
      percentage: totalTasks > 0 ? Math.round((cat.value / totalTasks) * 100) : 0
    }));

    res.json(formattedDistribution);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getTimeDistribution = async (req, res) => {
  try {
    const userId = req.user.id;
    const timeSlots = {
      'Morning (6-12)': 0,
      'Afternoon (12-18)': 0,
      'Evening (18-24)': 0,
      'Night (0-6)': 0
    };

    const tasks = await Task.find({ user: userId }, 'createdAt');

    tasks.forEach(task => {
      const hour = new Date(task.createdAt).getHours();
      if (hour >= 6 && hour < 12) timeSlots['Morning (6-12)']++;
      else if (hour >= 12 && hour < 18) timeSlots['Afternoon (12-18)']++;
      else if (hour >= 18 && hour < 24) timeSlots['Evening (18-24)']++;
      else timeSlots['Night (0-6)']++;
    });

    const timeDistribution = Object.entries(timeSlots).map(([name, value]) => ({ name, value }));
    res.json(timeDistribution);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



exports.getMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user.id;
    const monthlyTrends = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      date.setDate(1); 
      date.setHours(0, 0, 0, 0);

      const nextMonth = new Date(date);
      nextMonth.setMonth(date.getMonth() + 1);

      const tasksInMonth = await Task.find({
        user: userId,
        createdAt: { $gte: date, $lt: nextMonth }
      });

      const completed = tasksInMonth.filter(t => t.completed).length;
      const total = tasksInMonth.length;
      const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;

      monthlyTrends.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        completed,
        total,
        efficiency
      });
    }
    res.json(monthlyTrends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
