import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Paper,
  Fade,
  Stack,
} from '@mui/material';
import {
  Speed,
  Security,
  Engineering,
  GroupWork,
  Email,
  LocationOn,
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();

  const values = [
    {
      icon: <Speed sx={{ fontSize: 48, color: '#FF6B6B' }} />,
      title: 'Young Vision',
      description: 'As a 17-year-old entrepreneur, I bring fresh perspectives and modern ideas to streetwear design.'
    },
    {
      icon: <Engineering sx={{ fontSize: 48, color: '#4ECDC4' }} />,
      title: 'Quality First',
      description: 'Every piece is carefully designed with attention to detail and quality as the top priority.'
    },
    {
      icon: <GroupWork sx={{ fontSize: 48, color: '#FFE66D' }} />,
      title: 'Community',
      description: 'Building a brand that connects with young people who appreciate unique, quality streetwear.'
    },
    {
      icon: <Security sx={{ fontSize: 48, color: '#6C5CE7' }} />,
      title: 'Authenticity',
      description: 'Created by youth, for youth - bringing genuine Norwegian street culture to the world.'
    }
  ];

  const milestones = [
    {
      year: '2025',
      title: 'The Beginning',
      description: 'RYNE was founded by a 17-year-old Norwegian with a passion for streetwear and programming.'
    },
    {
      year: '2025',
      title: 'Website Launch',
      description: 'Developed and launched a fully custom e-commerce platform, completely self-programmed.'
    },
    {
      year: '2025',
      title: 'First Collection',
      description: 'Currently working on our debut collection, focusing on quality and unique designs.'
    },
    {
      year: 'Future',
      title: 'Growing Vision',
      description: 'Aiming to establish RYNE as a recognized name in the Norwegian streetwear scene.'
    }
  ];

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 24, color: '#FF6B6B' }} />,
      title: 'Email',
      info: 'contact@ryne.com'
    },
    {
      icon: <LocationOn sx={{ fontSize: 24, color: '#4ECDC4' }} />,
      title: 'Location',
      info: 'Norway'
    }
  ];

  return (
    <Fade in={true} timeout={1000}>
      <Container maxWidth="lg" sx={{ py: 12 }}>
        {/* Vision Section */}
        <Box 
          sx={{
            position: 'relative',
            mb: 12,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '150px',
              height: '4px',
              background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4)',
              borderRadius: '2px'
            }
          }}
        >
          <Typography 
            variant="h2" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
              letterSpacing: '0.02em'
            }}
          >
            My Vision
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto', 
              lineHeight: 1.8, 
              color: 'text.secondary',
              opacity: 0.9
            }}
          >
            Hey, I'm a 17-year-old entrepreneur from Norway, and RYNE is my passion project. 
            I've combined my love for streetwear fashion with my programming skills to create something unique. 
            Every aspect of this brand, from the website to the designs, is crafted by me with a focus on quality and authenticity.
          </Typography>
        </Box>

        {/* Values Section */}
        <Box sx={{ mb: 12 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 6,
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: '#FF6B6B',
                borderRadius: '2px'
              }
            }}
          >
            Brand Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255,255,255,0.05)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: 'rgba(255,255,255,0.03)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardContent sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 4
                  }}>
                    <Box 
                      sx={{ 
                        mb: 3,
                        transform: 'scale(1.2)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ opacity: 0.85 }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Journey Section */}
        <Box sx={{ mb: 12 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            align="center"
            sx={{ 
              mb: 6,
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: '#4ECDC4',
                borderRadius: '2px'
              }
            }}
          >
            The Journey Begins
          </Typography>
          <Card sx={{ 
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)',
            p: 6,
            borderRadius: 4
          }}>
            <Stack spacing={4}>
              {milestones.map((milestone, index) => (
                <Paper 
                  key={index}
                  elevation={0}
                  sx={{ 
                    p: 4,
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: 2,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.03)',
                      transform: 'translateX(8px)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      background: index % 2 === 0 ? '#FF6B6B' : '#4ECDC4',
                      borderRadius: '8px'
                    }
                  }}
                >
                  <Box sx={{ pl: 3 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: index % 2 === 0 ? '#FF6B6B' : '#4ECDC4',
                        fontWeight: 700,
                        mb: 1
                      }}
                    >
                      {milestone.year}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        color: 'white'
                      }}
                    >
                      {milestone.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        opacity: 0.85,
                        lineHeight: 1.7
                      }}
                    >
                      {milestone.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Box>

        {/* Contact Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              mb: 6,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: '#FFE66D',
                borderRadius: '2px'
              }
            }}
          >
            Get in Touch
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {contactInfo.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ 
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    background: 'rgba(255,255,255,0.03)'
                  }
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.info}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Fade>
  );
};

export default About; 