// src/components/common/SearchBar.js (düzeltilmiş)
import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import {
  Search,
  Tune,
  QrCodeScanner // Barcode yerine QrCodeScanner kullanıyoruz
} from '@mui/icons-material';

const SearchBar = ({ onSearch, onBarcodeSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        term: searchTerm,
        category: searchCategory
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSearchCategory(category);
    handleMenuClose();
  };

  const handleBarcodeClick = () => {
    if (onBarcodeSearch) {
      onBarcodeSearch();
    } else {
      console.log('Barkod/QR kod okuma özelliği aktif değil');
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 600 }}>
      <Box sx={{ position: 'relative', flexGrow: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ürün, marka veya kategori ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <IconButton 
                onClick={handleMenuOpen}
                sx={{ mr: 1 }}
              >
                <Tune />
              </IconButton>
            ),
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleCategorySelect('all')}>
            <Typography>Tüm Kategoriler</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleCategorySelect('electronics')}>
            <Typography>Elektronik</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleCategorySelect('home')}>
            <Typography>Ev & Yaşam</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleCategorySelect('clothing')}>
            <Typography>Giyim</Typography>
          </MenuItem>
        </Menu>
      </Box>
      
      <IconButton 
        onClick={handleSearch}
        sx={{ ml: 1, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
      >
        <Search />
      </IconButton>
      
      <IconButton 
        onClick={handleBarcodeClick}
        sx={{ ml: 1, bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } }}
      >
        <QrCodeScanner /> {/* Barcode yerine QrCodeScanner */}
      </IconButton>
    </Box>
  );
};

export default SearchBar;