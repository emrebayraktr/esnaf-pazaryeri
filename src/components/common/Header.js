// src/components/common/Header.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  Paper,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Person,
  LocationOn,
  QrCodeScanner,
  Favorite,
  Notifications,
  Menu as MenuIcon,
  Close,
  ArrowDropDown
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLocationContext } from '../../contexts/LocationContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [locationAnchor, setLocationAnchor] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const { selectedLocation, updateLocation } = useLocationContext();
  const navigate = useNavigate();

  const locations = [
    'İstanbul, Kadıköy',
    'İstanbul, Beşiktaş',
    'İstanbul, Üsküdar',
    'Ankara, Çankaya',
    'İzmir, Karşıyaka',
    'Bursa, Nilüfer'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/products', { 
        state: { search: { term: searchTerm.trim(), category: 'all' } } 
      });
      setSearchTerm('');
    }
  };

  const handleBarcodeScan = () => {
    navigate('/products', { state: { barcode: '5901234123457' } });
  };

  const handleProfileMenu = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleLocationMenu = (event) => {
    setLocationAnchor(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchor(null);
    setLocationAnchor(null);
    setMobileMenuAnchor(null);
  };

  const handleLocationSelect = (location) => {
    updateLocation(location);
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="sticky" className="new-header" elevation={2}>
      {/* Üst Bilgi Çubuğu */}
      <Box className="top-bar">
        <Box className="container">
          <Typography variant="caption" className="welcome-text">
            🎉 Yeni müşterilere özel %10 indirim! Kupon: HOSGELDIN10
          </Typography>
          <Box className="top-bar-actions">
            <Button 
              size="small" 
              className="top-bar-btn"
              onClick={() => navigate('/stores')}
            >
              Mağazalar
            </Button>
            <Button 
              size="small" 
              className="top-bar-btn"
              onClick={() => navigate('/campaigns')}
            >
              Kampanyalar
            </Button>
            <Button 
              size="small" 
              className="top-bar-btn"
              onClick={() => navigate('/help')}
            >
              Yardım
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Ana Header */}
      <Toolbar className="main-toolbar">
        {/* Logo */}
        <Box 
          className="logo-container"
          onClick={() => navigate('/')}
        >
          <Typography variant="h4" className="logo-text">
            🛍️ EsnafPazar
          </Typography>
          <Typography variant="caption" className="logo-subtitle">
            Yerel Alışveriş Platformu
          </Typography>
        </Box>

        {/* Konum Seçici */}
        <Box className="location-selector">
          <IconButton 
            size="small" 
            onClick={handleLocationMenu}
            className="location-btn"
          >
            <LocationOn fontSize="small" />
          </IconButton>
          <Box className="location-info">
            <Typography variant="caption" className="location-label">
              Teslimat Adresi
            </Typography>
            <Typography 
              variant="body2" 
              className="location-value"
              onClick={handleLocationMenu}
            >
              {selectedLocation}
              <ArrowDropDown fontSize="small" />
            </Typography>
          </Box>
          <Menu
            anchorEl={locationAnchor}
            open={Boolean(locationAnchor)}
            onClose={handleClose}
          >
            {locations.map((location) => (
              <MenuItem
                key={location}
                onClick={() => handleLocationSelect(location)}
                selected={location === selectedLocation}
              >
                {location}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Arama Çubuğu */}
        <Paper 
          component="form" 
          className="search-paper"
          onSubmit={handleSearch}
        >
          <InputBase
            placeholder="Ürün, marka veya mağaza ara..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Divider orientation="vertical" flexItem />
          <IconButton 
            type="submit" 
            className="search-btn"
          >
            <Search />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton 
            className="barcode-btn"
            onClick={handleBarcodeScan}
          >
            <QrCodeScanner />
          </IconButton>
        </Paper>

        {/* İşlem Butonları */}
        <Box className="action-buttons">
          <IconButton 
            className="action-btn"
            onClick={() => navigate('/favorites')}
          >
            <Favorite />
          </IconButton>

          <IconButton 
            className="action-btn"
            onClick={() => navigate('/notifications')}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton 
            className="action-btn"
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Kullanıcı Menüsü */}
          {currentUser ? (
            <>
              <IconButton 
                className="user-btn"
                onClick={handleProfileMenu}
              >
                <Avatar 
                  src={currentUser.avatar} 
                  sx={{ width: 32, height: 32 }}
                >
                  {currentUser.name?.charAt(0)}
                </Avatar>
                <Box className="user-info">
                  <Typography variant="body2" className="user-name">
                    {currentUser.name}
                  </Typography>
                  <Typography variant="caption" className="user-balance">
                    1.250 ₺
                  </Typography>
                </Box>
                <ArrowDropDown fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                  <Person sx={{ mr: 1 }} /> Profilim
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/orders'); }}>
                  📦 Siparişlerim
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/favorites'); }}>
                  <Favorite sx={{ mr: 1 }} /> Favorilerim
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/wallet'); }}>
                  💳 Cüzdanım
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  🚪 Çıkış Yap
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box className="auth-buttons">
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => navigate('/login')}
                className="login-btn"
              >
                Giriş Yap
              </Button>
              <Button 
                variant="contained" 
                size="small"
                onClick={() => navigate('/register')}
                className="register-btn"
              >
                Kayıt Ol
              </Button>
            </Box>
          )}
        </Box>

        {/* Mobil Menü Butonu */}
        <IconButton 
          className="mobile-menu-btn"
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Kategori Çubuğu */}
      <Box className="category-bar">
        <Box className="container">
          {[
            'Elektronik', 'Ev & Yaşam', 'Giyim', 'Spor', 
            'Kitap', 'Anne & Bebek', 'Kozmetik', 'Market'
          ].map((category) => (
            <Chip
              key={category}
              label={category}
              variant="outlined"
              onClick={() => navigate('/products', { 
                state: { search: { term: '', category: category.toLowerCase() } } 
              })}
              className="category-chip"
            />
          ))}
        </Box>
      </Box>

      {/* Mobil Menü */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleClose}
        className="mobile-menu"
      >
        <MenuItem onClick={() => { handleClose(); navigate('/'); }}>
          Ana Sayfa
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/products'); }}>
          Tüm Ürünler
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/stores'); }}>
          Mağazalar
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/campaigns'); }}>
          Kampanyalar
        </MenuItem>
        <Divider />
        {currentUser ? (
          <>
            <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
              Profilim
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Çıkış Yap
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => { handleClose(); navigate('/login'); }}>
              Giriş Yap
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/register'); }}>
              Kayıt Ol
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
};

export default Header;