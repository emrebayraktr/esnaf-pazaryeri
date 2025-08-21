// src/components/product/ProductCard.js (güncelleme)
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton, Rating } from '@mui/material';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { addToCart } = useCart();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    addToCart(product);
    // Sepete eklendi bildirimi gösterilebilir
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Card className="product-card">
      <Box className="product-badges">
        {discount > 0 && (
          <Box className="discount-badge">%{discount}</Box>
        )}
        <IconButton 
          className="favorite-btn" 
          onClick={handleFavoriteClick}
          size="small"
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      
      <CardMedia
        component="img"
        height="200"
        image={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
      />
      
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3" noWrap>
          {product.name}
        </Typography>
        
        <Box className="price-section">
          <Typography variant="h6" color="primary">
            {product.price.toFixed(2)} ₺
          </Typography>
          {product.originalPrice > product.price && (
            <Typography variant="body2" color="textSecondary" className="original-price">
              {product.originalPrice.toFixed(2)} ₺
            </Typography>
          )}
        </Box>
        
        <Box className="store-info">
          <Typography variant="body2" color="textSecondary">
            {product.store}
          </Typography>
        </Box>
        
        <Box className="rating-section">
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="body2" color="textSecondary">
            ({product.rating})
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          fullWidth 
          startIcon={<ShoppingCart />}
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Sepete Ekle
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;