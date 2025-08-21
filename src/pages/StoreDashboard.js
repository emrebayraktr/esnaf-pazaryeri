// src/pages/StoreDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { productService, firebaseService } from '../services/firebaseService';
import { COLLECTIONS } from '../firebase/models';
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  BarChart,
  Inventory,
  Store,
  AttachMoney,
  People,
  Star,
} from "@mui/icons-material";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const StatCard = ({ icon, title, value, subtitle, color }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ color, fontSize: 40 }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const StoreDashboard = () => {
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [storeProducts, setStoreProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageRating: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadStoreData();
    }
  }, [currentUser]);

  const loadStoreData = async () => {
    try {
      setLoading(true);
      const products = await productService.getStoreProducts(currentUser.storeId);
      
      setStoreProducts(products);
      
      // İstatistikleri hesapla
      const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.sales), 0);
      const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
      
      setStats({
        totalProducts: products.length,
        totalOrders: totalSales,
        totalRevenue: totalRevenue,
        averageRating: 4.5, // Bu veriyi reviews koleksiyonundan alabilirsiniz
        pendingOrders: 8 // Bu veriyi orders koleksiyonundan alabilirsiniz
      });
    } catch (error) {
      console.error('Mağaza verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await firebaseService.add(COLLECTIONS.PRODUCTS, {
        ...productData,
        storeId: currentUser.storeId,
        storeName: currentUser.storeName,
        isApproved: false // Admin onayı bekleyecek
      });
      await loadStoreData(); // Verileri yeniden yükle
    } catch (error) {
      console.error('Ürün eklenirken hata:', error);
    }
  };

  const quickActions = [
    {
      label: "Yeni Ürün Ekle",
      icon: <Add />,
      onClick: () => navigate("/store/products"),
    },
    {
      label: "Mağaza Bilgilerini Düzenle",
      icon: <Edit />,
      onClick: () => navigate("/store/settings"),
    },
    {
      label: "Siparişleri Görüntüle",
      icon: <BarChart />,
      onClick: () => navigate("/store/orders"),
    },
    {
      label: "Stok Durumu",
      icon: <Inventory />,
      onClick: () => navigate("/store/products"),
    },
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case "active":
        return <Chip label="Aktif" color="success" size="small" />;
      case "out_of_stock":
        return <Chip label="Stokta Yok" color="error" size="small" />;
      case "pending":
        return <Chip label="Beklemede" color="warning" size="small" />;
      case "processing":
        return <Chip label="İşleniyor" color="info" size="small" />;
      case "completed":
        return <Chip label="Tamamlandı" color="success" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              TeknoMarket Yönetim Paneli
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Mağaza performansı ve yönetim araçları
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Add />}>
            Yeni Ürün Ekle
          </Button>
        </Box>
      </Box>

      {/* İstatistik Kartları */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4} sx={{ minWidth: 200 }}>
          <StatCard
            icon={<Inventory />}
            title="Ürünler"
            value={storeStats.totalProducts}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4} sx={{ minWidth: 200 }}>
          <StatCard
            icon={<AttachMoney />}
            title="Toplam Gelir"
            value={`${storeStats.totalRevenue} ₺`}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4} sx={{ minWidth: 200 }}>
          <StatCard
            icon={<BarChart />}
            title="Siparişler"
            value={storeStats.totalOrders}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4} sx={{ minWidth: 200 }}>
          <StatCard
            icon={<Star />}
            title="Puan"
            value={storeStats.averageRating}
            subtitle="ortalama"
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4} sx={{ minWidth: 200 }}>
          <StatCard
            icon={<People />}
            title="Bekleyen"
            value={storeStats.pendingOrders}
            subtitle="sipariş"
            color="#d32f2f"
          />
        </Grid>
      </Grid>

      {/* Yönetim Sekmeleri */}
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Genel Bakış" />
          <Tab label="Ürünlerim" />
          <Tab label="Siparişler" />
          <Tab label="Müşteri Yorumları" />
          <Tab label="Mağaza Ayarları" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Son Siparişler
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sipariş No</TableCell>
                      <TableCell>Müşteri</TableCell>
                      <TableCell>Tutar</TableCell>
                      <TableCell>Durum</TableCell>
                      <TableCell>Tarih</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.amount} ₺</TableCell>
                        <TableCell>{getStatusChip(order.status)}</TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Hızlı İşlemler
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={action.icon}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                ))}
                <Button variant="outlined" startIcon={<Add />}>
                  Yeni Ürün Ekle
                </Button>
                <Button variant="outlined" startIcon={<Edit />}>
                  Mağaza Bilgilerini Düzenle
                </Button>
                <Button variant="outlined" startIcon={<BarChart />}>
                  Raporları Görüntüle
                </Button>
                <Button variant="outlined" startIcon={<Inventory />}>
                  Stok Durumu
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Ürün Listesi
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ürün Adı</TableCell>
                  <TableCell>Fiyat</TableCell>
                  <TableCell>Stok</TableCell>
                  <TableCell>Satış</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price} ₺</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>{getStatusChip(product.status)}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default StoreDashboard;
