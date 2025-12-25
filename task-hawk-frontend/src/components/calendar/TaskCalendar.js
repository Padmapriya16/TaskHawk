import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { 
  Box, 
  Typography, 
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
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { Add, Edit, Delete, Event } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import { calendarService } from '../../services/calendarService';
import { PRIORITY_COLORS } from '../../utils/constants';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TaskCalendar.css';

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const { tasks, loading } = useApp();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [eventForm, setEventForm] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    priority: 'medium',
    type: 'task'
  });

  useEffect(() => {
    loadCalendarEvents();
  }, [tasks]);

  const loadCalendarEvents = async () => {
    try {
      // Convert tasks to calendar events
      const taskEvents = tasks.map(task => ({
        id: task._id,
        title: task.title,
        start: task.deadline ? new Date(task.deadline) : new Date(),
        end: task.deadline ? new Date(new Date(task.deadline).getTime() + (task.estimatedTime || 30) * 60000) : new Date(),
        resource: {
          ...task,
          type: 'task'
        }
      }));

      // Load additional calendar events
      const startDate = moment(date).startOf('month').subtract(1, 'week').toISOString();
      const endDate = moment(date).endOf('month').add(1, 'week').toISOString();
      
      const calendarEvents = await calendarService.getEvents(startDate, endDate);
      const formattedCalendarEvents = calendarEvents.map(event => ({
        id: event._id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        resource: {
          ...event,
          type: 'event'
        }
      }));

      setEvents([...taskEvents, ...formattedCalendarEvents]);
    } catch (error) {
      console.error('Error loading calendar events:', error);
      // Fallback to tasks only
      const taskEvents = tasks.map(task => ({
        id: task._id,
        title: task.title,
        start: task.deadline ? new Date(task.deadline) : new Date(),
        end: task.deadline ? new Date(new Date(task.deadline).getTime() + (task.estimatedTime || 30) * 60000) : new Date(),
        resource: {
          ...task,
          type: 'task'
        }
      }));
      setEvents(taskEvents);
    }
  };

  const eventStyleGetter = (event) => {
    const isTask = event.resource.type === 'task';
    const priority = event.resource.priority || 'medium';
    const completed = event.resource.completed;
    
    let backgroundColor = PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
    
    if (isTask && completed) {
      backgroundColor = '#4CAF50';
    } else if (!isTask) {
      backgroundColor = '#2678E1';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        opacity: completed ? 0.7 : 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '500'
      }
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
      description: event.resource.description || '',
      priority: event.resource.priority || 'medium',
      type: event.resource.type || 'event'
    });
    setShowModal(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent(null);
    setEventForm({
      title: '',
      start: moment(start).format('YYYY-MM-DDTHH:mm'),
      end: moment(end).format('YYYY-MM-DDTHH:mm'),
      description: '',
      priority: 'medium',
      type: 'event'
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setEventForm({
      title: '',
      start: '',
      end: '',
      description: '',
      priority: 'medium',
      type: 'event'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...eventForm,
        start: new Date(eventForm.start),
        end: new Date(eventForm.end)
      };

      if (selectedEvent && selectedEvent.resource.type === 'event') {
        await calendarService.updateEvent(selectedEvent.id, eventData);
      } else if (!selectedEvent) {
        await calendarService.createEvent(eventData);
      }
      
      loadCalendarEvents();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedEvent && selectedEvent.resource.type === 'event') {
      try {
        await calendarService.deleteEvent(selectedEvent.id);
        loadCalendarEvents();
        handleCloseModal();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const upcoming = events
      .filter(event => event.start >= today)
      .sort((a, b) => a.start - b.start)
      .slice(0, 5);
    return upcoming;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div className="calendar-container">
      <Container fluid>
        {/* Header */}
        <div className="calendar-header">
          <div>
            <Typography variant="h3" className="calendar-title">
              Task Calendar 📅
            </Typography>
            <Typography variant="h6" className="calendar-subtitle">
              Visualize your schedule and deadlines
            </Typography>
          </div>
        </div>

        <Row>
          {/* Calendar */}
          <Col xl={9} lg={8} className="mb-4">
            <Card className="calendar-card">
              <Card.Body>
                <div className="calendar-controls mb-3">
                  <div className="view-buttons">
                    {[
                      { key: Views.MONTH, label: 'Month', icon: '📅' },
                      { key: Views.WEEK, label: 'Week', icon: '📊' },
                      { key: Views.DAY, label: 'Day', icon: '📋' }
                    ].map(viewOption => (
                      <Button
                        key={viewOption.key}
                        variant={view === viewOption.key ? 'primary' : 'outline-primary'}
                        className="view-btn"
                        onClick={() => setView(viewOption.key)}
                      >
                        <span className="view-icon">{viewOption.icon}</span>
                        {viewOption.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="calendar-wrapper">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    view={view}
                    onView={setView}
                    date={date}
                    onNavigate={setDate}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    popup
                    showMultiDayTimes
                    step={30}
                    timeslots={2}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xl={3} lg={4}>
            {/* Quick Stats */}
            <Card className="stats-sidebar-card mb-4">
              <Card.Body>
                <Typography variant="h6" className="sidebar-title mb-3">
                  📊 Quick Stats
                </Typography>
                <div className="sidebar-stats">
                  <div className="sidebar-stat">
                    <span className="stat-number">{events.length}</span>
                    <span className="stat-label">Total Events</span>
                  </div>
                  <div className="sidebar-stat">
                    <span className="stat-number">{tasks.filter(t => !t.completed).length}</span>
                    <span className="stat-label">Pending Tasks</span>
                  </div>
                  <div className="sidebar-stat">
                    <span className="stat-number">{getUpcomingEvents().length}</span>
                    <span className="stat-label">Upcoming</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Upcoming Events */}
            <Card className="upcoming-card">
              <Card.Body>
                <Typography variant="h6" className="sidebar-title mb-3">
                  ⏰ Upcoming Events
                </Typography>
                <div className="upcoming-events">
                  {getUpcomingEvents().length === 0 ? (
                    <div className="no-events">
                      <Typography variant="body2" color="textSecondary">
                        No upcoming events
                      </Typography>
                    </div>
                  ) : (
                    getUpcomingEvents().map((event) => (
                      <div key={event.id} className="upcoming-event" onClick={() => handleSelectEvent(event)}>
                        <div className="event-indicator" style={{ backgroundColor: eventStyleGetter(event).style.backgroundColor }}></div>
                        <div className="event-details">
                          <Typography variant="body2" className="event-title">
                            {event.title}
                          </Typography>
                          <Typography variant="caption" className="event-time">
                            {moment(event.start).format('MMM DD, h:mm A')}
                          </Typography>
                          {event.resource.type === 'task' && (
                            <Chip 
                              label="Task" 
                              size="small" 
                              variant="outlined"
                              className="event-type-chip"
                            />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add event"
          className="fab-add"
          onClick={() => handleSelectSlot({ start: new Date(), end: new Date(Date.now() + 3600000) })}
        >
          <Add />
        </Fab>

        {/* Event Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>
              {selectedEvent ? 'Edit Event' : 'Create New Event'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-custom">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={12} className="mb-3">
                  <TextField
                    fullWidth
                    label="Event Title"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    required
                    variant="outlined"
                  />
                </Col>
                <Col lg={6} className="mb-3">
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Start Time"
                    value={eventForm.start}
                    onChange={(e) => setEventForm({...eventForm, start: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    required
                  />
                </Col>
                <Col lg={6} className="mb-3">
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="End Time"
                    value={eventForm.end}
                    onChange={(e) => setEventForm({...eventForm, end: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    required
                  />
                </Col>
                <Col lg={12} className="mb-3">
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    variant="outlined"
                  />
                </Col>
                <Col lg={6} className="mb-3">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={eventForm.priority}
                      onChange={(e) => setEventForm({...eventForm, priority: e.target.value})}
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
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={eventForm.type}
                      onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                      label="Type"
                      disabled={selectedEvent && selectedEvent.resource.type === 'task'}
                    >
                      <MenuItem value="event">📅 Event</MenuItem>
                      <MenuItem value="meeting">🤝 Meeting</MenuItem>
                      <MenuItem value="reminder">⏰ Reminder</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <div className="modal-actions">
                {selectedEvent && selectedEvent.resource.type === 'event' && (
                  <Button variant="danger" onClick={handleDelete} className="me-auto">
                    <Delete className="me-1" />
                    Delete
                  </Button>
                )}
                <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {selectedEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default TaskCalendar;
