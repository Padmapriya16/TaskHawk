import React from 'react';
import AppHeader from '../components/common/AppHeader'; // Your global top header
import Footer from '../components/common/Footer';     // Your global footer

const TermsAndConditions = () => {
  const tableData = [
    { category: 'Personal Information', details: 'Name, email address, contact information', purpose: 'Account creation and communication' },
    { category: 'Usage Data', details: 'App usage patterns, task completion rates', purpose: 'Service improvement and AI optimization' },
    { category: 'Device Information', details: 'Device type, operating system, browser information', purpose: 'Technical support and compatibility' },
    { category: 'Location Data', details: 'General location for timezone settings', purpose: 'Scheduling optimization' }
  ];

  return (
    <div style={{ fontFamily: 'Fredoka, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <AppHeader />
      <style jsx>{`
        .terms-page {
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

        .last-updated {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-top: 20px;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .content-section {
          padding: 60px 20px;
          background: white;
        }

        .section {
          margin-bottom: 50px;
        }

        .section-title {
          font-size: 1.8rem;
          color: #114A92;
          font-weight: bold;
          margin-bottom: 20px;
          font-family: 'Fredoka', sans-serif;
        }

        .section-content {
          color: #666;
          line-height: 1.7;
          font-size: 1rem;
        }

        .section-content p {
          margin-bottom: 15px;
        }

        .section-content ul {
          margin: 15px 0;
          padding-left: 20px;
        }

        .section-content li {
          margin-bottom: 8px;
        }

        .highlight-box {
          background: #ECF4F8;
          border-left: 4px solid #2678E1;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }

        .highlight-box h4 {
          color: #114A92;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 30px 0;
        }

        .column-box {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
        }

        .column-title {
          color: #114A92;
          font-weight: bold;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .data-table th {
          background: #114A92;
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: 600;
        }

        .data-table td {
          padding: 15px;
          border-bottom: 1px solid #e0e0e0;
          color: #666;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tr:nth-child(even) {
          background: #f8f9fa;
        }

        .liability-list {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }

        .liability-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .liability-item:last-child {
          margin-bottom: 0;
        }

        .liability-icon {
          color: #e17055;
          margin-right: 10px;
          font-size: 1.2rem;
          margin-top: 2px;
        }

        .liability-text {
          color: #666;
          flex: 1;
        }

        .contact-section {
          background: #ECF4F8;
          padding: 40px 30px;
          border-radius: 10px;
          margin: 40px 0;
          text-align: center;
        }

        .contact-title {
          color: #114A92;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .contact-text {
          color: #666;
          margin-bottom: 20px;
        }

        .contact-btn {
          background: #2678E1;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-btn:hover {
          background: #114A92;
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
          .two-column {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .data-table {
            font-size: 0.9rem;
          }

          .data-table th,
          .data-table td {
            padding: 10px;
          }

          .footer-links {
            gap: 20px;
            flex-direction: column;
            align-items: center;
          }

          .section-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="terms-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Terms And Conditions</h1>
            <p className="hero-subtitle">
              Please read these terms and conditions carefully before using Task Hawk
            </p>
            <p className="last-updated">Last updated: January 15, 2024</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="content-section">
          <div className="container">
            
            {/* Section 1: General Registration */}
            <div className="section">
              <h2 className="section-title">1. General Registration</h2>
              <div className="section-content">
                <p>
                  By accessing and using Task Hawk, you agree to be bound by these Terms and Conditions. 
                  If you do not agree to these terms, please do not use our service.
                </p>
                <p>
                  To use Task Hawk, you must register for an account by providing accurate and complete 
                  information. You are responsible for maintaining the confidentiality of your account 
                  credentials and for all activities that occur under your account.
                </p>
                <div className="highlight-box">
                  <h4>Important Note:</h4>
                  <p>You must be at least 16 years old to use Task Hawk. By registering, you confirm that you meet this age requirement.</p>
                </div>
              </div>
            </div>

            {/* Section 2: Acceptance, Use */}
            <div className="section">
              <h2 className="section-title">2. Acceptance, Use</h2>
              <div className="section-content">
                <p>
                  By using Task Hawk, you acknowledge that you have read, understood, and agree to be 
                  bound by these terms. Your continued use of the service constitutes acceptance of 
                  any modifications to these terms.
                </p>
                
                <div className="two-column">
                  <div className="column-box">
                    <div className="column-title">Permitted Uses</div>
                    <ul>
                      <li>Personal task management and scheduling</li>
                      <li>Team collaboration and project management</li>
                      <li>Productivity tracking and analytics</li>
                      <li>Integration with other productivity tools</li>
                    </ul>
                  </div>
                  <div className="column-box">
                    <div className="column-title">Prohibited Uses</div>
                    <ul>
                      <li>Sharing account credentials with others</li>
                      <li>Attempting to breach system security</li>
                      <li>Using the service for illegal activities</li>
                      <li>Reverse engineering or copying features</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Intellectual Property */}
            <div className="section">
              <h2 className="section-title">3. Intellectual Property</h2>
              <div className="section-content">
                <p>
                  Task Hawk and all its content, features, and functionality are owned by our company 
                  and are protected by international copyright, trademark, and other intellectual 
                  property laws.
                </p>
                <p>
                  You retain ownership of the content you create using Task Hawk, including your tasks, 
                  notes, and other data. However, you grant us a license to use this data to provide 
                  and improve our services.
                </p>
              </div>
            </div>

            {/* Section 4: Subscription and Payments */}
            <div className="section">
              <h2 className="section-title">4. Subscription and Payments</h2>
              <div className="section-content">
                <p>
                  Task Hawk offers both free and premium subscription plans. Premium features require 
                  a paid subscription with automatic renewal unless cancelled.
                </p>
                
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Data Type</th>
                      <th>Details</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.category}</td>
                        <td>{row.details}</td>
                        <td>{row.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="highlight-box">
                  <h4>Refund Policy:</h4>
                  <p>We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions are non-refundable after the first 7 days.</p>
                </div>
              </div>
            </div>

            {/* Section 5: Termination */}
            <div className="section">
              <h2 className="section-title">5. Termination</h2>
              <div className="section-content">
                <p>
                  You may terminate your account at any time by contacting our support team or using 
                  the account deletion feature in your settings. We reserve the right to terminate 
                  accounts that violate these terms.
                </p>
                <p>
                  Upon termination, your access to Task Hawk will cease, and your data may be deleted 
                  after a 30-day grace period. We recommend exporting your data before termination.
                </p>
              </div>
            </div>

            {/* Section 6: Limitation of Liability */}
            <div className="section">
              <h2 className="section-title">6. Limitation of Liability</h2>
              <div className="section-content">
                <p>
                  Task Hawk is provided "as is" without warranties of any kind. We are not liable for 
                  any damages arising from your use of the service.
                </p>
                
                <div className="liability-list">
                  <div className="liability-item">
                    <span className="liability-icon">⚠️</span>
                    <span className="liability-text">
                      We are not responsible for data loss due to technical issues or user error
                    </span>
                  </div>
                  <div className="liability-item">
                    <span className="liability-icon">⚠️</span>
                    <span className="liability-text">
                      Service interruptions or downtime may occur during maintenance
                    </span>
                  </div>
                  <div className="liability-item">
                    <span className="liability-icon">⚠️</span>
                    <span className="liability-text">
                      Third-party integrations are subject to their own terms and conditions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Contacts */}
            <div className="section">
              <h2 className="section-title">7. Contacts</h2>
              <div className="section-content">
                <p>
                  If you have any questions about these Terms and Conditions, please contact us using 
                  the information below.
                </p>
                
                <div className="contact-section">
                  <h3 className="contact-title">Need Help?</h3>
                  <p className="contact-text">
                    Our support team is here to help you with any questions or concerns about our terms and conditions.
                  </p>
                  <button className="contact-btn">Contact Support</button>
                </div>
              </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;