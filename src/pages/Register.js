// src/pages/Register.js
import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Store,
  AdminPanelSettings,
  Phone,
  LocationOn
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Register = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    // Temel bilgiler
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    
    // İşletme bilgileri (işletme kaydı için)
    storeName: '',
    storeCategory: '',
    storeAddress: '',
    storePhone: '',
    storeDescription: '',
    
    // Adres bilgileri
    address: '',
    city: '',
    district: '',
    postalCode: ''
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const steps = ['Hesap Bilgileri', 'Profil Bilgileri', 'Doğrulama'];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFormData(prev => ({
      ...prev,
      userType: newValue === 0 ? 'customer' : newValue === 1 ? 'store' : 'admin'
    }));
    setError('');
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Şifre kontrolü
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      setLoading(false);
      return;
    }

    // Şifre güçlülük kontrolü
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır!');
      setLoading(false);
      return;
    }

    try {
      await register(formData.email, formData.password, formData);
      
      // Kullanıcı tipine göre yönlendirme
      switch (formData.userType) {
        case 'admin':
          navigate('/admin');
          break;
        case 'store':
          navigate('/store/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError('Kayıt başarısız: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const categories = [
    'Elektronik',
    'Ev & Yaşam',
    'Giyim',
    'Spor & Outdoor',
    'Kitap & Kırtasiye',
    'Oyuncak',
    'Kozmetik',
    'Market',
    'Diğer'
  ];

  const cities = [
    'İstanbul',
    'Ankara',
    'İzmir',
    'Bursa',
    'Antalya',
    'Adana',
    'Konya',
    'Gaziantep'
  ];

  const istanbulDistricts = [
    'Kadıköy',
    'Beşiktaş',
    'Şişli',
    'Beyoğlu',
    'Üsküdar',
    'Maltepe',
    'Kartal',
    'Pendik'
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab icon={<Person />} label="Müşteri" />
            <Tab icon={<Store />} label="İşletme" />
            <Tab icon={<AdminPanelSettings />} label="Yönetici" disabled />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {activeTab === 0 ? 'Müşteri Kaydı' : 'İşletme Kaydı'}
          </Typography>
          
          <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            {activeTab === 0 
              ? 'Alışveriş yapmak ve kampanyalardan haberdar olmak için kaydolun' 
              : 'Mağazanızı ekleyerek ürünlerinizi satmaya başlayın'}
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Adım 1: Hesap Bilgileri */}
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Şifre"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Şifre Tekrar"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {/* Adım 2: Profil Bilgileri */}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={activeTab === 0 ? "Ad Soyad" : "İşletme Sahibi Ad Soyad"}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                
                {activeTab === 1 && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="İşletme Adı"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="İşletme Kategorisi"
                        name="storeCategory"
                        value={formData.storeCategory}
                        onChange={handleChange}
                        required
                      >
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="İşletme Telefonu"
                        name="storePhone"
                        value={formData.storePhone}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="İşletme Adresi"
                        name="storeAddress"
                        value={formData.storeAddress}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="İşletme Açıklaması"
                        name="storeDescription"
                        value={formData.storeDescription}
                        onChange={handleChange}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </>
                )}
                
                {activeTab === 0 && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="İl"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      >
                        {cities.map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="İlçe"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        disabled={!formData.city}
                      >
                        {istanbulDistricts.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Adres"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Posta Kodu"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            )}

            {/* Adım 3: Doğrulama */}
            {activeStep === 2 && (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Kayıt Bilgilerinizi Kontrol Edin
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {activeTab === 0 
                    ? 'Müşteri hesabınızı oluşturmak üzeresiniz. Bilgileriniz doğru ise "Kayıt Ol" butonuna tıklayın.'
                    : 'İşletme hesabınızı oluşturmak üzeresiniz. Bilgileriniz doğru ise "Kayıt Ol" butonuna tıklayın.'}
                </Typography>
                
                <Box sx={{ textAlign: 'left', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Email:</strong> {formData.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Ad Soyad:</strong> {formData.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Telefon:</strong> {formData.phone}
                  </Typography>
                  
                  {activeTab === 1 && (
                    <>
                      <Typography variant="body2">
                        <strong>İşletme Adı:</strong> {formData.storeName}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Kategori:</strong> {formData.storeCategory}
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Geri
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  İleri
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;