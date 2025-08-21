import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Alert
} from '@mui/material';
import {
  Save,
  Store,
  Phone,
  Email,
  LocationOn,
  Schedule,
  Public
} from '@mui/icons-material';
const StoreSettings = () => {
  const [storeData, setStoreData] = useState({
    name: "TeknoMarket",
    description: "2005'ten beri Kadıköy'de hizmet veren elektronik mağazası",
    phone: "+90 216 345 67 89",
    email: "info@teknomarket.com",
    address: "Caferağa Mah., Bahariye Cad. No:45, Kadıköy/İstanbul",
    website: "www.teknomarket.com",
    openingHours: "09:00 - 19:00",
    isActive: true,
    acceptsDelivery: true,
    acceptsPickup: true
  });
  const [saveStatus, setSaveStatus] = useState('');
  const handleInputChange = (field, value) => {
    setStoreData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    // Simüle edilmiş kaydetme işlemi
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 3000);
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mağaza Ayarları
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Mağaza bilgilerinizi düzenleyin ve ayarları yapılandırın
        </Typography>
      </Box>
      {saveStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Ayarlar başarıyla kaydedildi!
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Temel Bilgiler
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mağaza Adı"
                  value={storeData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  InputProps={{
                    startAdornment: <Store sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Mağaza Açıklaması"
                  value={storeData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefon"
                  value={storeData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={storeData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Adres"
                  value={storeData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website"
                  value={storeData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  InputProps={{
                    startAdornment: <Public sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Çalışma Saatleri"
                  value={storeData.openingHours}
                  onChange={(e) => handleInputChange('openingHours', e.target.value)}
                  InputProps={{
                    startAdornment: <Schedule sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Hizmet Ayarları
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={storeData.acceptsDelivery}
                      onChange={(e) => handleInputChange('acceptsDelivery', e.target.checked)}
                    />
                  }
                  label="Teslimat Hizmeti"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={storeData.acceptsPickup}
                      onChange={(e) => handleInputChange('acceptsPickup', e.target.checked)}
                    />
                  }
                  label="Mağazadan Teslim"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={storeData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    />
                  }
                  label="Mağaza Durumu (Aktif/Pasif)"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                size="large"
              >
                Değişiklikleri Kaydet
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mağaza Önizleme
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {storeData.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {storeData.description}
                </Typography>
                <Typography variant="body2" paragraph>
                  <Phone fontSize="small" sx={{ mr: 1 }} />
                  {storeData.phone}
                </Typography>
                <Typography variant="body2" paragraph>
                  <LocationOn fontSize="small" sx={{ mr: 1 }} />
                  {storeData.address}
                </Typography>
                <Typography variant="body2">
                  <Schedule fontSize="small" sx={{ mr: 1 }} />
                  {storeData.openingHours}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default StoreSettings;