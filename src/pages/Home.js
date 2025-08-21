// src/pages/Home.js (son hali)
import React from 'react';
import { Container, Grid, Typography, Button, Card, CardContent, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/product/ProductCard';
import StoreCard from '../components/store/StoreCard'; // Doğru import
import './Home.css';

// Örnek veriler (gerçek uygulamada API'den gelecek)
const featuredProducts = [
  {
    id: 1,
    name: "Kahve Makinesi",
    price: 1250,
    originalPrice: 1500,
    store: "TeknoMarket",
    image: "https://via.placeholder.com/300",
    rating: 4.5
  },
  {
    id: 2,
    name: "Blender Seti",
    price: 899,
    originalPrice: 1100,
    store: "EvGerek",
    image: "https://via.placeholder.com/300",
    rating: 4.2
  },
  {
    id: 3,
    name: "Akıllı Saat",
    price: 1550,
    originalPrice: 1900,
    store: "TeknoSaati",
    image: "https://via.placeholder.com/300",
    rating: 4.7
  }
];

const nearbyStores = [
  {
    id: 1,
    name: "TeknoMarket",
    category: "Elektronik",
    rating: 4.5,
    deliveryTime: "30 dk",
    image: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    name: "EvGerek",
    category: "Ev Eşyaları",
    rating: 4.3,
    deliveryTime: "45 dk",
    image: "https://via.placeholder.com/300"
  },
  {
    id: 3,
    name: "MobilyaDünyası",
    category: "Mobilya",
    rating: 4.7,
    deliveryTime: "1 gün",
    image: "https://via.placeholder.com/300"
  }
];

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box className="hero-section">
        <Typography variant="h2" component="h1" gutterBottom>
          Mahallenden Al, Esnafı Destekle
        </Typography>
        <Typography variant="h5" gutterBottom>
          Yerel esnafın ürünlerini keşfet, en uygun fiyatlarla satın al
        </Typography>
        <Button variant="contained" size="large" sx={{ mt: 2 }}>
          Hemen Keşfet
        </Button>
      </Box>

      {/* Öne Çıkan Ürünler */}
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Öne Çıkan Ürünler
        </Typography>
        <Grid container spacing={3}>
          {featuredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Yakındaki Mağazalar */}
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Yakındaki Mağazalar
        </Typography>
        <Grid container spacing={3}>
          {nearbyStores.map(store => (
            <Grid item xs={12} sm={6} md={4} key={store.id}>
              <StoreCard store={store} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Kategori Grid */}
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Kategoriler
        </Typography>
        <Grid container spacing={3}>
          {['Elektronik', 'Ev & Yaşam', 'Giyim', 'Spor', 'Kitap', 'Diğer'].map(category => (
            <Grid item xs={6} sm={4} md={2} key={category}>
              <Card className="category-card">
                <CardContent>
                  <Typography variant="h6" align="center">
                    {category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;