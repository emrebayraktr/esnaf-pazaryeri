// src/pages/Login.js (düzeltilmiş)
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
  Divider,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Store,
  Person
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

const Login = () => {
  const [activeTab, setActiveTab] = useState(0); // activeTab state'ini ekledik
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Test hesapları
  const testAccounts = {
    0: { email: 'musteri@esnafpazar.com', password: '123456', userType: 'customer' },
    1: { email: 'esnaf@esnafpazar.com', password: '123456', userType: 'store' },
    2: { email: 'admin@esnafpazar.com', password: '123456', userType: 'admin' }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Test hesabı ile hızlı giriş
      const testAccount = testAccounts[activeTab];
      await login(testAccount.email, testAccount.password, testAccount.userType);
      
      // Rol bazlı yönlendirme
      switch (testAccount.userType) {
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
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = (accountType) => {
    const account = testAccounts[accountType];
    setFormData({
      ...formData,
      email: account.email,
      password: account.password
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab icon={<Person />} label="Müşteri" />
            <Tab icon={<Store />} label="İşletme" />
            <Tab icon={<AdminPanelSettings />} label="Yönetici" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Müşteri Girişi
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            Ürünleri keşfetmek ve alışveriş yapmak için giriş yapın
          </Typography>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            İşletme Girişi
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            Mağazanızı yönetmek ve ürün eklemek için giriş yapın
          </Typography>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Yönetici Girişi
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            Sistem yönetimi ve denetim için giriş yapın
          </Typography>
        </TabPanel>

        <Divider />

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Şifre"
            name="password"
            type={formData.showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Demo için test hesabını kullan:
            </Typography>
            <Button
              size="small"
              onClick={() => handleTestLogin(activeTab)}
              sx={{ mt: 1 }}
            >
              Test Hesabını Doldur
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;