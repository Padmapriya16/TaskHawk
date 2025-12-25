import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Typography, Box, Divider } from '@mui/material';
import AppHeader from '../components/common/AppHeader'; // Your global top header
import Footer from '../components/common/Footer';     // Your global footer
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <Box className="privacy-page-wrapper">
      <AppHeader /> {/* Global Header for static pages */}
      <Container className="privacy-container">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            <Card className="privacy-card">
              <Card.Body>
                <Typography variant="h3" className="privacy-title mb-4">
                  Privacy Policy
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                  Last updated: January 1, 2023
                </Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  At TaskHawk, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and services.
                  By using TaskHawk, you agree to the collection and use of information in accordance with this policy.
                </Typography>

                <section className="privacy-section">
                  <Typography variant="h5" className="section-heading">1. Information We Collect</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    We collect several types of information to provide and improve our services:
                  </Typography>
                  <Typography variant="h6" className="sub-heading">Personal Information</Typography>
                  <ul>
                    <li><Typography variant="body1">Name</Typography></li>
                    <li><Typography variant="body1">Email address</Typography></li>
                    <li><Typography variant="body1">Profile information</Typography></li>
                    <li><Typography variant="body1">Payment details (for premium)</Typography></li>
                    <li><Typography variant="body1">Contact preferences</Typography></li>
                  </ul>
                  <Typography variant="h6" className="sub-heading">Usage Data</Typography>
                  <ul>
                    <li><Typography variant="body1">IP address</Typography></li>
                    <li><Typography variant="body1">Browser type</Typography></li>
                    <li><Typography variant="body1">Pages visited</Typography></li>
                    <li><Typography variant="body1">Time spent</Typography></li>
                    <li><Typography variant="body1">Device information</Typography></li>
                    <li><Typography variant="body1">Operating system</Typography></li>
                  </ul>
                </section>

                <Divider sx={{ my: 4 }} className="privacy-divider" />

                <section className="privacy-section">
                  <Typography variant="h5" className="section-heading">2. How We Use Your Information</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    We use the collected data for various purposes:
                  </Typography>
                  <Row>
                    <Col md={6}>
                      <Typography variant="h6" className="sub-heading">To provide and maintain our services</Typography>
                      <ul>
                        <li><Typography variant="body1">Including monitoring the usage and improving functionality</Typography></li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <Typography variant="h6" className="sub-heading">To notify you of changes</Typography>
                      <ul>
                        <li><Typography variant="body1">Such as updates to services, features, or our privacy terms</Typography></li>
                      </ul>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Typography variant="h6" className="sub-heading">For legal compliance</Typography>
                      <ul>
                        <li><Typography variant="body1">Ensure we follow all applicable legal and regulatory requirements.</Typography></li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <Typography variant="h6" className="sub-heading">To provide customer support</Typography>
                      <ul>
                        <li><Typography variant="body1">Assist with issues and respond to your queries quickly.</Typography></li>
                      </ul>
                    </Col>
                  </Row>
                </section>

                <Divider sx={{ my: 4 }} className="privacy-divider" />

                <section className="privacy-section">
                  <Typography variant="h5" className="section-heading">3. Data Security</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
                  </Typography>
                </section>

                <Divider sx={{ my: 4 }} className="privacy-divider" />

                <section className="privacy-section">
                  <Typography variant="h5" className="section-heading">4. Your Data Protection Rights</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Depending on your location, you may have the following data protection rights:
                  </Typography>
                  <ul>
                    <li><Typography variant="body1">The right to access, update or delete the information we have on you.</Typography></li>
                    <li><Typography variant="body1">The right to object to our processing of your Personal Information.</Typography></li>
                    <li><Typography variant="body1">The right to request that we restrict the processing of your personal information.</Typography></li>
                    <li><Typography variant="body1">The right to data portability.</Typography></li>
                    <li><Typography variant="body1">The right to withdraw consent at any time.</Typography></li>
                  </ul>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    If you wish to exercise any of these rights, please contact us.
                  </Typography>
                </section>

                <Divider sx={{ my: 4 }} className="privacy-divider" />

                <section className="privacy-section">
                  <Typography variant="h5" className="section-heading">5. Changes to This Privacy Policy</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                  </Typography>
                </section>

                <Divider sx={{ my: 4 }} className="privacy-divider" />

                <section className="privacy-section">
                  <Typography variant="h5" className="section-heading">6. Contact Us</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    If you have any questions about this Privacy Policy, please contact us:
                  </Typography>
                  <Row>
                    <Col md={6}>
                      <Typography variant="h6" className="sub-heading">Email</Typography>
                      <Typography variant="body1">privacy.taskhawk@gmail.com</Typography>
                    </Col>
                    <Col md={6}>
                      <Typography variant="h6" className="sub-heading">Mailing Address</Typography>
                      <Typography variant="body1">34 Ramakrishna Street, Anna Nagar, Chennai</Typography>
                    </Col>
                  </Row>
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer /> {/* Global Footer */}
    </Box>
  );
};

export default PrivacyPolicy;
