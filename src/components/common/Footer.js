// src/components/common/Footer.js
import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="app-footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Esnaf İlan Pazaryeri
            </Typography>
            <Typography variant="body2">
              Yerel esnafı destekleyen, mahallenizdeki ürünleri keşfetmenizi sağlayan platform.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Bağlantılar
            </Typography>
            <Link href="#" color="inherit" display="block">Hakkımızda</Link>
            <Link href="#" color="inherit" display="block">İletişim</Link>
            <Link href="#" color="inherit" display="block">Kullanım Koşulları</Link>
            <Link href="#" color="inherit" display="block">Gizlilik Politikası</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              İletişim
            </Typography>
            <Typography variant="body2">
              Email: info@esnafpazaryeri.com
            </Typography>
            <Typography variant="body2">
              Telefon: 0212 345 67 89
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Esnaf İlan Pazaryeri. Tüm hakları saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;