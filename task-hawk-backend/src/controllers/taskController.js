const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, priority, category, deadline, estimatedTime } = req.body;
  try {
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      priority,
      category,
      deadline,
      estimatedTime,
    });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.updateTask = async (req, res) => {
  const { title, description, priority, category, deadline, estimatedTime, completed } = req.body;
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (priority) taskFields.priority = priority;
  if (category) taskFields.category = category;
  if (deadline) taskFields.deadline = deadline;
  if (estimatedTime) taskFields.estimatedTime = estimatedTime;
  if (typeof completed === 'boolean') taskFields.completed = completed; 

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

   
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true, runValidators: true } 
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};


exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};
