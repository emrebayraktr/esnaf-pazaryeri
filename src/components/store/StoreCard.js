// src/components/store/StoreCard.js (tam versiyon)
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating } from '@mui/material';
import { LocationOn, Schedule } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StoreCard = ({ store }) => {
  const navigate = useNavigate();

  const handleStoreClick = () => {
    navigate(`/store/${store.id}`);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={store.image || "https://via.placeholder.com/300"}
        alt={store.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {store.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {store.category}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={store.rating} readOnly size="small" />
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            ({store.rating})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            {store.deliveryTime} uzaklıkta
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Schedule fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            {store.deliveryTime}
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={handleStoreClick}
        >
          Mağazayı Gör
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoreCard;