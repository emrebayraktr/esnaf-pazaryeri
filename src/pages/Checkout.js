// src/pages/Checkout.js (yeni dosya)
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Checkout = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Ödeme
      </Typography>
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="body1">
          Ödeme sayfası yakında eklenecek...
        </Typography>
      </Box>
    </Container>
  );
};

export default Checkout;