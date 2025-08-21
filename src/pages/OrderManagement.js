import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Visibility,
  LocalShipping,
  CheckCircle,
  Cancel,
  AttachMoney
} from '@mui/icons-material';
const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1001,
      customer: "Ahmet Yılmaz",
      amount: 1250,
      status: "completed",
      date: "2023-04-15",
      items: ["Kahve Makinesi"],
      address: "Kadıköy, İstanbul"
    },
    {
      id: 1002,
      customer: "Ayşe Demir",
      amount: 899,
      status: "processing",
      date: "2023-04-14",
      items: ["Blender Seti"],
      address: "Beşiktaş, İstanbul"
    },
    {
      id: 1003,
      customer: "Mehmet Kaya",
      amount: 3100,
      status: "pending",
      date: "2023-04-14",
      items: ["Akıllı Saat", "Kulaklık"],
      address: "Üsküdar, İstanbul"
    }
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };
  const getStatusChip = (status) => {
    switch (status) {
      case "pending": return <Chip label="Beklemede" color="warning" />;
      case "processing": return <Chip label="Hazırlanıyor" color="info" />;
      case "shipped": return <Chip label="Kargoda" color="secondary" />;
      case "completed": return <Chip label="Tamamlandı" color="success" />;
      case "cancelled": return <Chip label="İptal Edildi" color="error" />;
      default: return <Chip label={status} />;
    }
  };
  const getStatusActions = (order) => {
    switch (order.status) {
      case "pending":
        return (
          <>
            <Button
              size="small"
              startIcon={<CheckCircle />}
              onClick={() => handleUpdateStatus(order.id, "processing")}
            >
              İşleme Al
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<Cancel />}
              onClick={() => handleUpdateStatus(order.id, "cancelled")}
            >
              İptal Et
            </Button>
          </>
        );
      case "processing":
        return (
          <Button
            size="small"
            startIcon={<LocalShipping />}
            onClick={() => handleUpdateStatus(order.id, "shipped")}
          >
            Kargoya Ver
          </Button>
        );
      case "shipped":
        return (
          <Button
            size="small"
            startIcon={<CheckCircle />}
            onClick={() => handleUpdateStatus(order.id, "completed")}
          >
            Tamamlandı
          </Button>
        );
      default:
        return null;
    }
  };
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sipariş Yönetimi
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Müşteri siparişlerini takip edin ve yönetin
        </Typography>
      </Box>
      {/* İstatistik Kartları */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoney sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    {orders.reduce((total, order) => total + order.amount, 0)} ₺
                  </Typography>
                  <Typography variant="body2">Toplam Ciro</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalShipping sx={{ fontSize: 40, color: '#2e7d32', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{orders.length}</Typography>
                  <Typography variant="body2">Toplam Sipariş</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ fontSize: 40, color: '#ed6c02', mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    {orders.filter(o => o.status === 'completed').length}
                  </Typography>
                  <Typography variant="body2">Tamamlanan</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Cancel sx={{ fontSize: 40, color: '#d32f2f', mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    {orders.filter(o => o.status === 'pending').length}
                  </Typography>
                  <Typography variant="body2">Bekleyen</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sipariş No</TableCell>
              <TableCell>Müşteri</TableCell>
              <TableCell>Tutar</TableCell>
              <TableCell>Ürünler</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount} ₺</TableCell>
                <TableCell>{order.items.join(', ')}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{getStatusChip(order.status)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(order)}
                    >
                      <Visibility />
                    </IconButton>
                    {getStatusActions(order)}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Sipariş Detay Dialog */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Sipariş Detayları - #{selectedOrder?.id}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" gutterBottom>Müşteri Bilgileri</Typography>
              <Typography><strong>İsim:</strong> {selectedOrder.customer}</Typography>
              <Typography><strong>Adres:</strong> {selectedOrder.address}</Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Sipariş Bilgileri</Typography>
              <Typography><strong>Tutar:</strong> {selectedOrder.amount} ₺</Typography>
              <Typography><strong>Tarih:</strong> {selectedOrder.date}</Typography>
              <Typography><strong>Durum:</strong> {getStatusChip(selectedOrder.status)}</Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Ürünler</Typography>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default OrderManagement;