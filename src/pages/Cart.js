// src/pages/Cart.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Divider
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCartCheckout
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    // Ödeme sayfasına yönlendirme yapılacak
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h4" gutterBottom>
            Sepetiniz Boş
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Sepetinize henüz ürün eklemediniz.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            onClick={() => navigate('/products')}
          >
            Alışverişe Başla
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Sepetim
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      sx={{ width: 80, height: 80, objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.store}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{item.price.toFixed(2)} ₺</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        size="small"
                        sx={{ width: 60, mx: 1 }}
                        inputProps={{ 
                          style: { textAlign: 'center' },
                          min: 1 
                        }}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      />
                      <IconButton 
                        size="small" 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton 
                      color="error" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Button 
            variant="outlined" 
            color="error" 
            onClick={clearCart}
            sx={{ mt: 2 }}
          >
            Sepeti Temizle
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sipariş Özeti
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Ara Toplam:</Typography>
                  <Typography variant="body1">{getCartTotal().toFixed(2)} ₺</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Kargo:</Typography>
                  <Typography variant="body1">Ücretsiz</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Toplam:</Typography>
                  <Typography variant="h6" color="primary">
                    {getCartTotal().toFixed(2)} ₺
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<ShoppingCartCheckout />}
                onClick={handleCheckout}
              >
                Ödemeye Geç
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;