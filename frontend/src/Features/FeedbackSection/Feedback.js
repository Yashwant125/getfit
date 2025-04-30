import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

const dummyFeedbacks = [
  {
    id: 1,
    memberName: 'Rahul Sharma',
    message: 'The treadmill on the left corner is making noise. Please check.',
    image: '/images/threadmill.jpg',
  },
  {
    id: 2,
    memberName: 'Sneha Verma',
    message: 'Dumbbell rack is too loose. Needs to be fixed.',
    image: '/images/dumbellrack.jpg',
  },
  {
    id: 3,
    memberName: 'Aman Gupta',
    message: 'Bench press handle is slippery.',
    image: '/images/seat.jpg', // Ensure the image path is correct
  },
];

const Feedback = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Member Feedback
      </Typography>

      <Grid container spacing={2}>
        {dummyFeedbacks.map((feedback) => (
          <Grid item xs={12} md={6} lg={4} key={feedback.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="250" // Increase height for better visibility
                image={feedback.image}
                alt="Feedback Image"
                sx={{
                  objectFit: 'contain', // Avoids cropping and makes the image fit in the container
                  width: '100%', // Ensures the image stretches across the full width of the container
                }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {feedback.memberName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feedback.message}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feedback;
