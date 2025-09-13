const CalendarEvent = require('../models/CalendarEvent');
const Task = require('../models/Task'); 
const mongoose = require('mongoose'); 


exports.createEvent = async (req, res) => {
  const { title, description, start, end, priority, type } = req.body;
  try {
    const newEvent = new CalendarEvent({
      user: req.user.id,
      title,
      description,
      start,
      end,
      priority,
      type,
    });
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const { start, end } = req.query; 

    let calendarEventQuery = { user: userId };
    if (start && end) {
      calendarEventQuery.start = { $gte: new Date(start) };
      calendarEventQuery.end = { $lte: new Date(end) };
    }

    const calendarEvents = await CalendarEvent.find(calendarEventQuery).sort({ start: 1 });

    
    let tasksAsEventsQuery = {
      user: userId,
      deadline: { $exists: true, $ne: null }, 
    };
    if (start && end) {
      
      tasksAsEventsQuery.deadline = { $gte: new Date(start), $lte: new Date(end) };
    }

    const tasksAsEvents = await Task.find(tasksAsEventsQuery);

    const formattedTasks = tasksAsEvents.map(task => ({
      _id: task._id,
      title: task.title,
      description: task.description,
      start: task.deadline,
      end: new Date(task.deadline.getTime() + (task.estimatedTime || 30) * 60000), 
      priority: task.priority,
      type: 'task', 
      completed: task.completed, 
      user: task.user,
      createdAt: task.createdAt,
    }));

    res.json([...calendarEvents, ...formattedTasks]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.updateEvent = async (req, res) => {
  const { title, description, start, end, priority, type } = req.body;
  const eventFields = {};
  if (title) eventFields.title = title;
  if (description) eventFields.description = description;
  if (start) eventFields.start = start;
  if (end) eventFields.end = end;
  if (priority) eventFields.priority = priority;
  if (type) eventFields.type = type;

  try {
    let event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Calendar event not found' });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this event' });
    }

    event = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true, runValidators: true } 
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Calendar event not found' });
    }
    res.status(500).send('Server Error');
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    let event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Calendar event not found' });
    }

    
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await CalendarEvent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Calendar event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Calendar event not found' });
    }
    res.status(500).send('Server Error');
  }
};
