import React from 'react';
import AppHeader from '../components/common/AppHeader'; // Your global top header
import Footer from '../components/common/Footer';     // Y
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Button,
  Avatar,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #114A92 0%, #2678E1 100%)',
  color: 'white',
  padding: '80px 0',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgba(255,255,255,0.05)" fill-rule="evenodd"%3E%3Cpath d="m0 40 40-40H20L0 20M40 40V20l-20 20"/%3E%3C/g%3E%3C/svg%3E") repeat',
  }
}));

const StatsCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: '20px',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  }
}));

const MissionSection = styled(Box)(({ theme }) => ({
  background: '#ECF4F8',
  padding: '80px 0',
}));

const TeamCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: '20px',
  height: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

const CtaSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #114A92 0%, #2678E1 100%)',
  color: 'white',
  padding: '80px 0',
  textAlign: 'center'
}));

const AboutUs = () => {
  const stats = [
    { number: '500+', label: 'Active Users' },
    { number: '10k+', label: 'Tasks Completed' },
    { number: '95%', label: 'Productivity Increase' }
  ];

  const teamMembers = [
    { name: 'Padma Priya R.', role: 'Lead Developer', avatar: 'P' },
    { name: 'Guru Aishwarya R.', role: 'UI/UX Designer', avatar: 'G' },
    { name: 'Rubini H.', role: 'Backend Developer', avatar: 'R' },
    { name: 'Nandhini A.', role: 'AI Specialist', avatar: 'N' },
    { name: 'Ezhil Oviya S.U', role: 'Project Manager', avatar: 'E' }
  ];

  return (
    <div style={{ fontFamily: 'Fredoka, sans-serif' }}>
        <AppHeader />
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" style={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold',
            marginBottom: '20px',
            fontSize: { xs: '2rem', md: '3.5rem' }
          }}>
            About Us
          </Typography>
          <Typography variant="h5" sx={{ 
            marginBottom: '30px',
            opacity: 0.9,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}>
            Empowering productivity through intelligent task management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                backgroundColor: 'white',
                color: '#114A92',
                '&:hover': { backgroundColor: '#f0f0f0' }
              }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StatsCard>
                <CardContent>
                  <Typography variant="h3" component="h2" sx={{ 
                    color: '#2678E1', 
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" sx={{ 
          textAlign: 'center',
          marginBottom: '50px',
          color: '#114A92',
          fontWeight: 'bold'
        }}>
          Our Story
        </Typography>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ 
              fontSize: '1.1rem',
              lineHeight: '1.7',
              marginBottom: '20px',
              color: '#666'
            }}>
              In today's overwhelming world where human attention is scattered and there's a need 
              for attending to many tasks at once, time - our most valuable asset - is being used 
              inefficiently.
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.1rem',
              lineHeight: '1.7',
              marginBottom: '20px',
              color: '#666'
            }}>
              Task Hawk was born from this realization. We integrate the power of AI with a 
              full-stack solution to maximize user productivity, considering peak working hours, 
              non-postponable schedules, and responding effectively to changing plans.
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: '#666'
            }}>
              Our solution takes everything into account - including breaks and downtime - and 
              constantly motivates users to complete tasks on time while keeping track of 
              everything they need to work with.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              height: '300px',
              backgroundColor: '#ECF4F8',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              color: '#2678E1'
            }}>
              🚀
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Mission Section */}
      <MissionSection>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" sx={{ 
            textAlign: 'center',
            marginBottom: '50px',
            color: '#114A92',
            fontWeight: 'bold'
          }}>
            Our Mission
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ 
                p: 4, 
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '15px',
                height: '100%'
              }}>
                <Box sx={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</Box>
                <Typography variant="h5" gutterBottom sx={{ color: '#114A92', fontWeight: 'bold' }}>
                  Focus
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Help users maintain focus on what matters most through intelligent task prioritization
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ 
                p: 4, 
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '15px',
                height: '100%'
              }}>
                <Box sx={{ fontSize: '3rem', marginBottom: '20px' }}>⚡</Box>
                <Typography variant="h5" gutterBottom sx={{ color: '#114A92', fontWeight: 'bold' }}>
                  Efficiency
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Maximize productivity through AI-powered scheduling and time management
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ 
                p: 4, 
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '15px',
                height: '100%'
              }}>
                <Box sx={{ fontSize: '3rem', marginBottom: '20px' }}>🌟</Box>
                <Typography variant="h5" gutterBottom sx={{ color: '#114A92', fontWeight: 'bold' }}>
                  Excellence
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Deliver exceptional user experience while promoting work-life balance
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </MissionSection>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" sx={{ 
          textAlign: 'center',
          marginBottom: '50px',
          color: '#114A92',
          fontWeight: 'bold'
        }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <TeamCard>
                <CardContent>
                  <Avatar sx={{ 
                    width: 80, 
                    height: 80, 
                    margin: '0 auto 15px',
                    backgroundColor: '#2678E1',
                    fontSize: '2rem'
                  }}>
                    {member.avatar}
                  </Avatar>
                  <Typography variant="h6" gutterBottom sx={{ color: '#114A92' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <CtaSection>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ 
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Ready to boost your productivity?
          </Typography>
          <Typography variant="h6" sx={{ 
            marginBottom: '30px',
            opacity: 0.9
          }}>
            Join thousands of users who have transformed their workflow with Task Hawk
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: 'white',
              color: '#114A92',
              padding: '12px 30px',
              fontSize: '1.1rem',
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </CtaSection>
      <Footer />
    </div>
  );
};

export default AboutUs;