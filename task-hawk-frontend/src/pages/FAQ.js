import React, { useState } from 'react';
import AppHeader from '../components/common/AppHeader'; // Your global top header
import Footer from '../components/common/Footer';     // Your global footer


const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      question: "What is Task Hawk?",
      answer: "Task Hawk is an AI-integrated smart task scheduler that automatically schedules your daily tasks based on analysis of your mood and habitual deep work patterns. It helps maximize productivity by considering your peak hours, non-postponable schedules, and responds effectively to changing plans."
    },
    {
      question: "How does the AI scheduling work?",
      answer: "Our AI analyzes your work patterns, mood data, and productivity trends to create optimal schedules. It learns from your behavior over time and automatically adjusts task timing based on when you're most productive, ensuring tasks are scheduled during your peak performance hours."
    },
    {
      question: "Can I customize my schedule?",
      answer: "Yes! While Task Hawk provides AI-powered scheduling, you have complete control to modify, reschedule, or customize your tasks. The system adapts to your preferences and learns from any changes you make to improve future scheduling recommendations."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We take data security seriously. All your personal information, task data, and usage patterns are encrypted and stored securely. We never share your personal data with third parties, and you have full control over your information."
    },
    {
      question: "How does team collaboration work?",
      answer: "Task Hawk includes team task management features where you can create teams, assign tasks with priorities, track progress, and collaborate seamlessly. Team members can view shared tasks, update progress, and communicate within the platform."
    },
    {
      question: "What devices can I use Task Hawk on?",
      answer: "Task Hawk is designed to work across all your devices. You can access it through web browsers on desktop, tablet, and mobile devices. All your data syncs seamlessly across devices so you can stay productive anywhere."
    },
    {
      question: "Does Task Hawk work offline?",
      answer: "While some features require internet connectivity for AI processing and syncing, basic task viewing and management functions work offline. Your changes will sync automatically when you reconnect to the internet."
    },
    {
      question: "How much does Task Hawk cost?",
      answer: "We offer flexible pricing plans to suit different needs. We have a free tier for individual users with basic features, and premium plans for advanced AI features and team collaboration. Visit our pricing page for detailed information."
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div style={{ fontFamily: 'Fredoka, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style jsx>{`
        .faq-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #114A92 0%, #2678E1 100%);
          color: white;
          padding: 80px 20px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgba(255,255,255,0.05)' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40H20L0 20M40 40V20l-20 20'/%3E%3C/g%3E%3C/svg%3E");
          background-repeat: repeat;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: bold;
          margin-bottom: 20px;
          font-family: 'Fredoka', sans-serif;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.2rem);
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .faq-section {
          padding: 60px 20px;
          background: #f8f9fa;
        }

        .faq-list {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .faq-item {
          border-bottom: 1px solid #e0e0e0;
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          width: 100%;
          padding: 25px 30px;
          background: none;
          border: none;
          text-align: left;
          font-size: 1.1rem;
          font-weight: 600;
          color: #114A92;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          font-family: 'Fredoka', sans-serif;
        }

        .faq-question:hover {
          background: #f8f9fa;
        }

        .faq-question.active {
          background: #ECF4F8;
          color: #2678E1;
        }

        .faq-icon {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
          color: #2678E1;
        }

        .faq-icon.rotated {
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          background: white;
        }

        .faq-answer.open {
          max-height: 300px;
          padding: 0 30px 25px;
        }

        .faq-answer-content {
          color: #666;
          line-height: 1.6;
          font-size: 1rem;
        }

        .still-questions-section {
          background: #114A92;
          color: white;
          padding: 50px 20px;
          text-align: center;
          margin: 40px 20px;
          border-radius: 15px;
        }

        .still-questions-title {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .still-questions-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          margin-bottom: 25px;
        }

        .contact-btn {
          background: white;
          color: #114A92;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .contact-btn:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }

        .cta-section {
          background: linear-gradient(135deg, #114A92 0%, #2678E1 100%);
          color: white;
          padding: 80px 20px;
          text-align: center;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: bold;
          margin-bottom: 20px;
        }

        .cta-subtitle {
          font-size: 1.2rem;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .cta-button {
          background-color: white;
          color: #114A92;
          border: none;
          padding: 15px 40px;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background-color: #f0f0f0;
          transform: translateY(-2px);
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        .footer-link {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .footer-link:hover {
          opacity: 1;
          color: white;
        }

        @media (max-width: 768px) {
          .faq-question {
            padding: 20px;
            font-size: 1rem;
          }

          .faq-answer.open {
            padding: 0 20px 20px;
          }

          .still-questions-section {
            margin: 40px 10px;
            padding: 40px 15px;
          }

          .footer-links {
            gap: 20px;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
      
      <div className="faq-page">
        <AppHeader />
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Frequently Asked Questions</h1>
            <p className="hero-subtitle">
              Find answers to common questions about Task Hawk and how it can transform your productivity
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <div className="faq-list">
              {faqData.map((item, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${openItem === index ? 'active' : ''}`}
                    onClick={() => toggleItem(index)}
                  >
                    <span>{item.question}</span>
                    <span className={`faq-icon ${openItem === index ? 'rotated' : ''}`}>
                      +
                    </span>
                  </button>
                  <div className={`faq-answer ${openItem === index ? 'open' : ''}`}>
                    <div className="faq-answer-content">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Still Have Questions Section */}
            <div className="still-questions-section">
              <h3 className="still-questions-title">Still Have Questions?</h3>
              <p className="still-questions-subtitle">
                Can't find what you're looking for? Get in touch with our support team
              </p>
              <button className="contact-btn">Contact Support</button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to boost your productivity?</h2>
            <p className="cta-subtitle">
              Join thousands of users who have transformed their workflow with Task Hawk
            </p>
            <button className="cta-button">Get Started</button>
            
            <div className="footer-links">
              <a href="#" className="footer-link">Quick Links</a>
              <a href="#" className="footer-link">Social Links</a>
              <a href="#" className="footer-link">Subscribe to our newsletter</a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default FAQ;