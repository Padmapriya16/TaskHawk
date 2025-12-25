import React, { useState } from 'react';
import './HomePage.css';
import AppHeader from '../components/common/AppHeader'; // Your global top header
import Footer from '../components/common/Footer';     // Your global footer

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Task hawk is the best app that actually improves the productivity. It has made deep work accessible easily by reducing the number of decisions made by people significantly.",
      name: "ALI ABDAAL",
      title: "Productivity entrepreneur",
      subtitle: "Author-Feel good productivity",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      text: "TaskHawk has completely transformed how I manage my daily tasks. The AI scheduling feature is incredible and saves me hours every week.",
      name: "SARAH JOHNSON",
      title: "Software Engineer",
      subtitle: "Tech Lead at Microsoft",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      text: "As a college student, TaskHawk helps me balance academics, extracurriculars, and personal life effortlessly. It's a game-changer!",
      name: "MICHAEL CHEN",
      title: "Computer Science Student",
      subtitle: "Stanford University",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home">
      <AppHeader />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>ACHIEVE MORE WITH<br />SMART TASK MANAGEMENT</h1>
          <p>Task hawk help you organize your life, boost productivity and reach your goals faster.Perfect for students and professionals alike</p>
          <br></br><button className="cta-button">Get Task Ready Now!</button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <h3>50000+</h3>
            <p>Active users</p>
          </div>
          <div className="stat">
            <h3>4.8/5</h3>
            <p>Rating</p>
          </div>
          <div className="stat">
            <h3>1M+</h3>
            <p>Task completed</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <p className="features-subtitle">WHY CHOOSE TASK HAWK?</p>
          <h2>Features That Makes Us Different</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span className="white-icon">📋</span>
            </div>
            <h3>Intuitive Task Organization</h3>
            <p>Organize tasks by project, priority and deadline with our intuitive drag and drop interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span className="white-icon">⏰</span>
            </div>
            <h3>Time Management</h3>
            <p>Built-in pomodoro timer and time tracking to maximize your focus and productivity</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span className="white-icon">📊</span>
            </div>
            <h3>Progress Analytics</h3>
            <p>Visual reports and insights to help you understand your productivity patterns</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span className="white-icon">🔔</span>
            </div>
            <h3>Smart Reminders</h3>
            <p>Never miss a deadline with customizable notifications and reminders</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span className="white-icon">👥</span>
            </div>
            <h3>Team Collaboration</h3>
            <p>Share tasks and projects with teammates for seamless collaboration</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span className="white-icon">🏆</span>
            </div>
            <h3>Achievement System</h3>
            <p>Stay motivated with badges and achievements as you complete tasks and reach goals</p>
          </div>
        </div>
      </section>

      {/* College Students Section */}
      <section className="college-section">
        <div className="college-content">
          <h2>Perfect For College Students</h2>
          <p>Task hawk's specialized features help you balance coursework, club activities, assignments, personal projects, internships, fellowships, scholarships, relationships :) and what not</p>
          <p>Make most of the most important days of your life in the happiest way with your personal assistant who would guide you what to do when!!</p>
          <div className="college-features">
            <div className="college-feature">
              <span className="arrow">→</span>
              <p>Automated assignments of tasks based on the analysis of your mood and deadlines</p>
            </div>
            <div className="college-feature">
              <span className="arrow">→</span>
              <p>Real time rescheduling based on unexpected situations like sick leave or sudden need for change in appointments</p>
            </div>
            <div className="college-feature">
              <span className="arrow">→</span>
              <p>Team works could be maintained through a separate portal thus keeping track of team mates work would be seamless</p>
            </div>
            <div className="college-feature">
              <span className="arrow">→</span>
              <p>Gamification allows you to work for fun as well just enabling you to work hard just to maintain streak and leaderboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-header">
          <p className="how-subtitle">Getting Started...!</p>
          <h2>How TaskHawk Works</h2>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Tell us about your work hours, energy peaks, and preferences</p>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add your Tasks</h3>
            <p>Input tasks with deadlines, priority levels, and estimated durations</p>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Smart Schedule</h3>
            <p>Our AI creates your optimal daily plan based on your unique profile</p>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Stay on Track</h3>
            <p>Scout helps you adapt to changes and maintain productivity</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>WORDS FROM THE TASK HAWKERS</h2>
        <div className="testimonial-card">
          <div className="stars">★★★★★</div>
          <p>{testimonials[currentTestimonial].text}</p>
          <div className="testimonial-author">
            <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
            <div>
              <h4>{testimonials[currentTestimonial].name}</h4>
              <p>{testimonials[currentTestimonial].title}</p>
              <p>{testimonials[currentTestimonial].subtitle}</p>
            </div>
          </div>
        </div>
        <div className="testimonial-nav">
          <button className="nav-btn" onClick={prevTestimonial}>←</button>
          <button className="nav-btn" onClick={nextTestimonial}>→</button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <h2>Ready to boost your productivity?</h2>
          <p>Join thousands of teams using Task Hawk to streamline their tasks and schedules.</p>
          <button className="get-started-btn">Get Started</button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
