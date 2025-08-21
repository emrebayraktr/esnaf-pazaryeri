// src/pages/ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button, Rating, Chip, Divider } from '@mui/material';
import { ShoppingCart, Favorite, Share } from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams();
  
  // Örnek ürün verisi
  const product = {
    id: 1,
    name: "Kahve Makinesi",
    price: 1250,
    originalPrice: 1500,
    store: "TeknoMarket",
    image: "https://via.placeholder.com/400",
    rating: 4.5,
    description: "Bu yüksek kaliteli kahve makinesi, güne mükemmel bir başlangıç yapmanızı sağlar. Otomatik öğütücü ve programlanabilir özellikleri ile istediğiniz kahveyi kolayca hazırlayabilirsiniz.",
    features: [
      "Otomatik öğütücü",
      "Programlanabilir zamanlayıcı",
      "Isıtmalı bardaklık",
      "Su filtresi",
      "Kolay temizlenebilir"
    ],
    stock: 15
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: '100%', height: 400, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.rating})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" color="primary" sx={{ mr: 2 }}>
              {product.price.toFixed(2)} ₺
            </Typography>
            {product.originalPrice > product.price && (
              <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                {product.originalPrice.toFixed(2)} ₺
              </Typography>
            )}
          </Box>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="body2" paragraph>
            Stok: {product.stock} adet
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Button variant="contained" size="large" startIcon={<ShoppingCart />} sx={{ mr: 2 }}>
              Sepete Ekle
            </Button>
            <Button variant="outlined" size="large" startIcon={<Favorite />} sx={{ mr: 2 }}>
              Favorilere Ekle
            </Button>
            <Button variant="outlined" size="large" startIcon={<Share />}>
              Paylaş
            </Button>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Satıcı: {product.store}
          </Typography>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Ürün Özellikleri
          </Typography>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>
                <Typography variant="body1">{feature}</Typography>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Teknik Özellikler
          </Typography>
          <Typography variant="body1">
            • Malzeme: Paslanmaz Çelik<br />
            • Güç: 1450 Watt<br />
            • Kapasite: 1.8 Litre<br />
            • Boyutlar: 30x20x35 cm<br />
            • Ağırlık: 4.2 kg<br />
            • Garanti: 2 Yıl
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;