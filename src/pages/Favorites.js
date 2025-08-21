// src/pages/Favorites.js (yeni dosya)
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Favorites = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Favorilerim
      </Typography>
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="body1">
          Favoriler sayfası yakında eklenecek...
        </Typography>
      </Box>
    </Container>
  );
};

export default Favorites;