// src/pages/UserProfile.js (düzeltme)
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  TextField,
  Avatar,
  Divider,
  IconButton,
  Rating // Eksik import eklendi
} from '@mui/material';
import {
  Edit,
  LocationOn,
  Email,
  Phone,
  CalendarToday
} from '@mui/icons-material';
import ProductCard from '../components/product/ProductCard';
import { useAuth } from '../contexts/AuthContext'; // Eksik import eklendi
import './UserProfile.css';


// Örnek kullanıcı verisi
const sampleUser = {
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  phone: "+90 532 123 45 67",
  joinDate: "15 Mart 2023",
  address: "Kadıköy, İstanbul",
  avatar: "/images/user-avatar.jpg",
  favorites: [
    {
      id: 1,
      name: "Kahve Makinesi",
      price: 1250,
      store: "TeknoMarket",
      image: "/images/coffee-machine.jpg",
      rating: 4.5
    },
    {
      id: 2,
      name: "Akıllı Saat",
      price: 1550,
      store: "TeknoSaati",
      image: "/images/smartwatch.jpg",
      rating: 4.7
    }
  ],
  reviews: [
    {
      id: 1,
      product: "Kahve Makinesi",
      store: "TeknoMarket",
      rating: 5,
      comment: "Çok kaliteli bir ürün, tavsiye ederim.",
      date: "10 Nisan 2023"
    },
    {
      id: 2,
      product: "Blender Seti",
      store: "EvGerek",
      rating: 4,
      comment: "Fiyatına göre gayet iyi, eksikleri var ama genel olarak memnunum.",
      date: "28 Mart 2023"
    }
  ]
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const UserProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(sampleUser);
  const { currentUser } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Burada verileri kaydetme işlemi yapılacak
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg">
      <Box className="profile-header">
        <Avatar
          src={userData.avatar}
          sx={{ width: 120, height: 120 }}
          className="profile-avatar"
        />
        <Box sx={{ ml: 4 }}>
          {isEditing ? (
            <TextField
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="h3" component="h1">
              {userData.name}
            </Typography>
          )}
          
          <Box className="user-info">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email fontSize="small" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {userData.email}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone fontSize="small" />
              {isEditing ? (
                <TextField
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  size="small"
                  sx={{ ml: 1, width: 200 }}
                />
              ) : (
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {userData.phone}
                </Typography>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn fontSize="small" />
              {isEditing ? (
                <TextField
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  size="small"
                  sx={{ ml: 1, width: 200 }}
                />
              ) : (
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {userData.address}
                </Typography>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarToday fontSize="small" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Üyelik Tarihi: {userData.joinDate}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box>
          {isEditing ? (
            <Button variant="contained" onClick={handleSave}>
              Kaydet
            </Button>
          ) : (
            <IconButton onClick={handleEditToggle}>
              <Edit />
            </IconButton>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Profil İçeriği */}
      <Box>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Favorilerim" />
          <Tab label="Yorumlarım" />
          <Tab label="Sipariş Geçmişi" />
          <Tab label="Ayarlar" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom>
            Favori Ürünlerim
          </Typography>
          {userData.favorites.length > 0 ? (
            <Grid container spacing={3}>
              {userData.favorites.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">
              Henüz favori ürününüz bulunmamaktadır.
            </Typography>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            Yaptığım Yorumlar
          </Typography>
          {userData.reviews.length > 0 ? (
            <Box>
              {userData.reviews.map(review => (
                <Card key={review.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6">
                          {review.product}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {review.store} - {review.date}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Rating value={review.rating} readOnly size="small" />
                        </Box>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {review.comment}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">
              Henüz yorum yapmamışsınız.
            </Typography>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            Sipariş Geçmişim
          </Typography>
          <Typography variant="body1">
            Sipariş geçmişiniz bulunmamaktadır.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h5" gutterBottom>
            Hesap Ayarları
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bildirim Tercihleri
              </Typography>
              <Typography variant="body2">
                Bildirim ayarları burada yapılandırılacak.
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Güvenlik
              </Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Şifre Değiştir
              </Button>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default UserProfile;