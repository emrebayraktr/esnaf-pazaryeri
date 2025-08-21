import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress
} from '@mui/material';
import {
  Edit,
  Delete,
  CheckCircle,
  Cancel,
  BarChart,
  Add,
  Person,
  Store,
  ShoppingCart,
  AttachMoney
} from '@mui/icons-material';
import { firebaseService } from '../services/firebaseService';
import { COLLECTIONS } from '../firebase/models';



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const StatCard = ({ icon, title, value, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ color, fontSize: 40, mr: 2 }}>{icon}</Box>
        <Box>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {title}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalProducts: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, productsData, storesData] = await Promise.all([
        firebaseService.getAll(COLLECTIONS.USERS),
        firebaseService.getAll(COLLECTIONS.PRODUCTS),
        firebaseService.getAll(COLLECTIONS.STORES)
      ]);

      setUsers(usersData);
      setProducts(productsData);
      setStores(storesData);

      setStats({
        totalUsers: usersData.length,
        totalStores: storesData.length,
        totalProducts: productsData.length,
        pendingApprovals: productsData.filter(p => !p.isApproved).length
      });
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await firebaseService.update(COLLECTIONS.PRODUCTS, productId, {
        isApproved: true,
        updatedAt: new Date()
      });
      await loadData(); // Verileri yeniden yükle
    } catch (error) {
      console.error('Ürün onaylanırken hata:', error);
    }
  };

  // ... diğer fonksiyonlar ...

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Yönetici Paneli
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Sistem istatistikleri ve yönetim araçları
        </Typography>
      </Box>

      {/* İstatistik Kartları */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<Person />} title="Toplam Kullanıcı" value={sampleStats.totalUsers} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<Store />} title="Toplam İşletme" value={sampleStats.totalStores} color="#2e7d32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<ShoppingCart />} title="Toplam Sipariş" value={sampleStats.totalOrders} color="#ed6c02" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<AttachMoney />} title="Toplam Gelir" value={`${sampleStats.revenue.toLocaleString()} ₺`} color="#9c27b0" />
        </Grid>
      </Grid>

      {/* Yönetim Sekmeleri */}
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Kullanıcı Yönetimi" />
          <Tab label="İşletmeler" />
          <Tab label="Ürün Onayları" />
          <Tab label="Raporlar" />
          <Tab label="Sistem Ayarları" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">Kullanıcı Yönetimi</Typography>
            <Button variant="contained" startIcon={<Add />}>
              Yeni Kullanıcı
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>İsim</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Tip</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>Kayıt Tarihi</TableCell>
                  <TableCell>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getUserTypeLabel(user.type)}</TableCell>
                    <TableCell>{getStatusChip(user.status)}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleEdit(user)}>
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

        {/* Diğer tab panelleri... */}
      </Paper>

      {/* Düzenleme Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Kullanıcı Düzenle - {selectedUser?.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="İsim"
            defaultValue={selectedUser?.name}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            defaultValue={selectedUser?.email}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Kullanıcı Tipi"
            defaultValue={selectedUser?.type}
            margin="normal"
          >
            <MenuItem value="customer">Müşteri</MenuItem>
            <MenuItem value="store">İşletme</MenuItem>
            <MenuItem value="admin">Yönetici</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Durum"
            defaultValue={selectedUser?.status}
            margin="normal"
          >
            <MenuItem value="active">Aktif</MenuItem>
            <MenuItem value="pending">Beklemede</MenuItem>
            <MenuItem value="suspended">Askıda</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;