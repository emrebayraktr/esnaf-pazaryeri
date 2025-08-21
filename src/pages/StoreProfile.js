// src/pages/StoreProfile.js (düzeltme)
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Rating,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Language,
  Facebook,
  Instagram,
  WhatsApp,
  Favorite,
  FavoriteBorder // Eksik import eklendi
} from '@mui/icons-material';
import ProductCard from '../components/product/ProductCard';
import './StoreProfile.css';

// Örnek mağaza verisi
const sampleStore = {
  id: 1,
  name: "TeknoMarket",
  category: "Elektronik",
  description: "2005'ten beri Kadıköy'de hizmet veren, elektronik ürünlerde uzman mağazamızda en kaliteli ürünleri en uygun fiyatlarla bulabilirsiniz.",
  rating: 4.5,
  reviewCount: 128,
  address: "Caferağa Mah., Bahariye Cad. No:45, Kadıköy/İstanbul",
  phone: "+90 216 345 67 89",
  email: "info@teknomarket.com",
  website: "www.teknomarket.com",
  socialMedia: {
    facebook: "teknomarket",
    instagram: "teknomarket",
    whatsapp: "+902163456789"
  },
  coverImage: "/images/store-cover.jpg",
  logo: "/images/store-logo.jpg",
  openingHours: [
    { day: "Pazartesi - Cuma", hours: "09:00 - 19:00" },
    { day: "Cumartesi", hours: "09:30 - 18:00" },
    { day: "Pazar", hours: "10:00 - 17:00" }
  ],
  services: ["Ücretsiz Kargo", "Kapıda Ödeme", "Montaj Hizmeti", "Garanti"]
};

// Örnek ürünler
const storeProducts = [
  {
    id: 1,
    name: "Kahve Makinesi",
    price: 1250,
    originalPrice: 1500,
    store: "TeknoMarket",
    image: "/images/coffee-machine.jpg",
    rating: 4.5
  },
  {
    id: 2,
    name: "Blender Seti",
    price: 899,
    originalPrice: 1100,
    store: "TeknoMarket",
    image: "/images/blender.jpg",
    rating: 4.2
  },
  {
    id: 3,
    name: "Akıllı Saat",
    price: 1550,
    originalPrice: 1900,
    store: "TeknoMarket",
    image: "/images/smartwatch.jpg",
    rating: 4.7
  },
  {
    id: 4,
    name: "Kulaklık",
    price: 450,
    originalPrice: 600,
    store: "TeknoMarket",
    image: "/images/headphones.jpg",
    rating: 4.3
  },
  {
    id: 5,
    name: "Masaüstü Bilgisayar",
    price: 12500,
    originalPrice: 14500,
    store: "TeknoMarket",
    image: "/images/computer.jpg",
    rating: 4.8
  },
  {
    id: 6,
    name: "Oyuncu Klavyesi",
    price: 750,
    originalPrice: 900,
    store: "TeknoMarket",
    image: "/images/keyboard.jpg",
    rating: 4.4
  }
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`store-tabpanel-${index}`}
      aria-labelledby={`store-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const StoreProfile = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const store = sampleStore;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  if (!store) {
    return (
      <Container>
        <Typography variant="h4">Mağaza bulunamadı</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Kapak Fotoğrafı */}
      <Box className="store-cover">
        <img src={store.coverImage} alt={store.name} className="cover-image" />
        <Box className="store-logo">
          <img src={store.logo} alt={store.name} />
        </Box>
      </Box>

      {/* Mağaza Bilgileri */}
      <Box className="store-info-header">
        <Box>
          <Typography variant="h3" component="h1">
            {store.name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {store.category}
          </Typography>
          
          <Box className="store-rating" sx={{ mt: 1 }}>
            <Rating value={store.rating} readOnly />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
              ({store.reviewCount} değerlendirme)
            </Typography>
          </Box>
        </Box>
        
        <Box>
          <IconButton 
            onClick={handleFavoriteClick} 
            color={isFavorite ? "error" : "default"}
            size="large"
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Button variant="contained" sx={{ ml: 1 }}>
            Mağazaya Mesaj At
          </Button>
        </Box>
      </Box>

      {/* İletişim Bilgileri */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                İletişim Bilgileri
              </Typography>
              
              <Box className="contact-info">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn color="primary" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {store.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone color="primary" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {store.phone}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email color="primary" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {store.email}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Language color="primary" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {store.website}
                  </Typography>
                </Box>
              </Box>
              
              <Box className="social-media" sx={{ mt: 2 }}>
                <IconButton>
                  <Facebook />
                </IconButton>
                <IconButton>
                  <Instagram />
                </IconButton>
                <IconButton>
                  <WhatsApp />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
          
          {/* Çalışma Saatleri */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Çalışma Saatleri
              </Typography>
              {store.openingHours.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{item.day}</Typography>
                  <Typography variant="body2">{item.hours}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          {/* Hizmetler */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hizmetler
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {store.services.map((service, index) => (
                  <Chip key={index} label={service} color="primary" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
          
          {/* Konum */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Konum
              </Typography>
              <Box className="map-placeholder">
                <Typography variant="body2">
                  Harita burada gösterilecek
                </Typography>
              </Box>
              <Button fullWidth variant="outlined" sx={{ mt: 1 }}>
                Yol Tarifi Al
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Ürünler ve Yorumlar */}
      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Ürünler" />
          <Tab label={`Yorumlar (${store.reviewCount})`} />
          <Tab label="Hakkında" />
        </Tabs>

        <Divider />

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {storeProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1">
            Yorumlar burada gösterilecek.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" paragraph>
            {store.description}
          </Typography>
          <Typography variant="body1">
            2005 yılında Kadıköy'de kurulan mağazamız, elektronik ürünlerde 15 yılı aşkın tecrübesiyle müşterilerine kaliteli hizmet sunmaktadır. 
            Geniş ürün yelpazemiz ve uzman kadromuzla ihtiyaçlarınıza en uygun çözümleri sunmaktan mutluluk duyarız.
          </Typography>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default StoreProfile;