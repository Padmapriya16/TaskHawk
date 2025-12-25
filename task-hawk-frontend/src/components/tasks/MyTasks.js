import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { 
  Box, 
  Typography, 
  Checkbox, 
  Chip, 
  IconButton, 
  Fab,
  CircularProgress,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Add, Edit, Delete, AccessTime, Flag } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import { PRIORITY_COLORS, TASK_CATEGORIES } from '../../utils/constants';
import './MyTasks.css';

const MyTasks = () => {
  const { tasks, loading, createTask, updateTask, deleteTask, toggleTaskComplete } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'work',
    deadline: '',
    estimatedTime: 30
  });

  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      category: 'work',
      deadline: '',
      estimatedTime: 30
    });
    setEditingTask(null);
  };

  const handleShowModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        category: task.category,
        deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '',
        estimatedTime: task.estimatedTime || 30
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskForm);
      } else {
        await createTask(taskForm);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await toggleTaskComplete(task._id, task.completed);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      case 'high':
        return task.priority === 'high' && !task.completed;
      default:
        return true;
    }
  });

  const getTaskStats = () => {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    const high = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    return { completed, pending, high, total: tasks.length };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div className="tasks-container">
      <Container fluid>
        {/* Header */}
        <div className="tasks-header">
          <div>
            <Typography variant="h3" className="tasks-title">
              My Tasks 📝
            </Typography>
            <Typography variant="h6" className="tasks-subtitle">
              Manage your daily tasks efficiently
            </Typography>
          </div>
        </div>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="stats-card total-card">
              <Card.Body className="text-center">
                <div className="stats-icon">📊</div>
                <Typography variant="h4" className="stats-number">{stats.total}</Typography>
                <Typography variant="body1" className="stats-label">Total Tasks</Typography>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="stats-card pending-card">
              <Card.Body className="text-center">
                <div className="stats-icon">⏳</div>
                <Typography variant="h4" className="stats-number">{stats.pending}</Typography>
                <Typography variant="body1" className="stats-label">Pending</Typography>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="stats-card completed-card">
              <Card.Body className="text-center">
                <div className="stats-icon">✅</div>
                <Typography variant="h4" className="stats-number">{stats.completed}</Typography>
                <Typography variant="body1" className="stats-label">Completed</Typography>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} lg={6} md={6} sm={12} className="mb-3">
            <Card className="stats-card high-card">
              <Card.Body className="text-center">
                <div className="stats-icon">🔥</div>
                <Typography variant="h4" className="stats-number">{stats.high}</Typography>
                <Typography variant="body1" className="stats-label">High Priority</Typography>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="filter-card">
              <Card.Body>
                <div className="filter-buttons">
                  {[
                    { key: 'all', label: 'All Tasks', icon: '📋' },
                    { key: 'pending', label: 'Pending', icon: '⏳' },
                    { key: 'completed', label: 'Completed', icon: '✅' },
                    { key: 'high', label: 'High Priority', icon: '🔥' }
                  ].map(filterOption => (
                    <Button
                      key={filterOption.key}
                      variant={filter === filterOption.key ? 'primary' : 'outline-primary'}
                      className="filter-btn"
                      onClick={() => setFilter(filterOption.key)}
                    >
                      <span className="filter-icon">{filterOption.icon}</span>
                      {filterOption.label}
                    </Button>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tasks Grid */}
        <Row>
          {filteredTasks.length === 0 ? (
            <Col lg={12}>
              <Card className="empty-state-card">
                <Card.Body className="text-center py-5">
                  <div className="empty-icon">📝</div>
                  <Typography variant="h5" className="mb-3">No tasks found</Typography>
                  <Typography variant="body1" color="textSecondary" className="mb-4">
                    {filter === 'all' 
                      ? "You don't have any tasks yet. Create your first task!"
                      : `No ${filter} tasks found. Try a different filter.`
                    }
                  </Typography>
                  <Button variant="primary" onClick={() => handleShowModal()}>
                    <Add className="me-2" />
                    Add Your First Task
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            filteredTasks.map((task) => (
              <Col xl={4} lg={6} md={6} sm={12} key={task._id} className="mb-3">
                <Card className={`task-card ${task.completed ? 'completed' : ''} ${task.priority}-priority`}>
                  <Card.Body>
                    {/* Task Header */}
                    <div className="task-header">
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task)}
                        sx={{
                          color: PRIORITY_COLORS[task.priority],
                          '&.Mui-checked': {
                            color: PRIORITY_COLORS[task.priority],
                          },
                        }}
                      />
                      <Typography 
                        variant="h6" 
                        className={`task-title ${task.completed ? 'completed-text' : ''}`}
                      >
                        {task.title}
                      </Typography>
                    </div>

                    {/* Task Description */}
                    {task.description && (
                      <Typography 
                        variant="body2" 
                        className={`task-description ${task.completed ? 'completed-text' : ''}`}
                      >
                        {task.description}
                      </Typography>
                    )}

                    {/* Task Meta */}
                    <div className="task-meta">
                      <Chip 
                        label={task.priority}
                        size="small"
                        sx={{ 
                          backgroundColor: PRIORITY_COLORS[task.priority], 
                          color: 'white',
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}
                        icon={<Flag sx={{ color: 'white !important' }} />}
                      />
                      <Chip 
                        label={task.category} 
                        size="small" 
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                      />
                      {task.estimatedTime && (
                        <Chip 
                          label={`${task.estimatedTime}min`} 
                          size="small" 
                          variant="outlined"
                          icon={<AccessTime />}
                        />
                      )}
                    </div>

                    {/* Deadline */}
                    {task.deadline && (
                      <div className="task-deadline">
                        <AccessTime fontSize="small" />
                        <Typography variant="caption">
                          Due: {new Date(task.deadline).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Typography>
                      </div>
                    )}

                    {/* Task Actions */}
                    <div className="task-actions">
                      <IconButton 
                        size="small" 
                        onClick={() => handleShowModal(task)}
                        className="edit-btn"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(task._id)}
                        className="delete-btn"
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          className="fab-add"
          onClick={() => handleShowModal()}
        >
          <Add />
        </Fab>

        {/* Add/Edit Task Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-custom">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={12} className="mb-3">
                  <TextField
                    fullWidth
                    label="Task Title"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    required
                    variant="outlined"
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                    variant="outlined"
                  />
                </Col>
                <Col lg={6} className="mb-3">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                      label="Priority"
                    >
                      <MenuItem value="low">🟢 Low</MenuItem>
                      <MenuItem value="medium">🟡 Medium</MenuItem>
                      <MenuItem value="high">🔴 High</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
                <Col lg={6} className="mb-3">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={taskForm.category}
                      onChange={(e) => setTaskForm({...taskForm, category: e.target.value})}
                      label="Category"
                    >
                      {TASK_CATEGORIES.map(category => (
                        <MenuItem key={category} value={category} sx={{ textTransform: 'capitalize' }}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col lg={6} className="mb-3">
                  <TextField
                    fullWidth
                    type="date"
                    label="Deadline"
                    value={taskForm.deadline}
                    onChange={(e) => setTaskForm({...taskForm, deadline: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Col>
                <Col lg={6} className="mb-3">
                  <TextField
                    fullWidth
                    type="number"
                    label="Estimated Time (minutes)"
                    value={taskForm.estimatedTime}
                    onChange={(e) => setTaskForm({...taskForm, estimatedTime: parseInt(e.target.value)})}
                    inputProps={{ min: 5, max: 480 }}
                    variant="outlined"
                  />
                </Col>
              </Row>
              <div className="modal-actions">
                <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default MyTasks;
