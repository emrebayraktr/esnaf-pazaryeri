import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Inventory,
  Category
} from '@mui/icons-material';
const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Kahve Makinesi",
      price: 1250,
      stock: 15,
      status: "active",
      sales: 28,
      category: "Elektronik",
      barcode: "5901234123457"
    },
    {
      id: 2,
      name: "Blender Seti",
      price: 899,
      stock: 8,
      status: "active",
      sales: 15,
      category: "Ev & Mutfak",
      barcode: "5901234123458"
    },
    {
      id: 3,
      name: "Akıllı Saat",
      price: 1550,
      stock: 0,
      status: "out_of_stock",
      sales: 42,
      category: "Elektronik",
      barcode: "5901234123459"
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    barcode: ''
  });
  const categories = ["Elektronik", "Ev & Mutfak", "Giyim", "Spor", "Kitap", "Diğer"];
  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setNewProduct(product);
    } else {
      setEditingProduct(null);
      setNewProduct({
        name: '',
        price: '',
        stock: '',
        category: '',
        barcode: ''
      });
    }
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };
  const handleSaveProduct = () => {
    if (editingProduct) {
      // Ürünü güncelle
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...editingProduct, ...newProduct } : p
      ));
    } else {
      // Yeni ürün ekle
      const product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...newProduct,
        status: "active",
        sales: 0
      };
      setProducts([...products, product]);
    }
    handleCloseDialog();
  };
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };
  const getStatusChip = (status) => {
    switch (status) {
      case "active": return <Chip label="Aktif" color="success" size="small" />;
      case "out_of_stock": return <Chip label="Stokta Yok" color="error" size="small" />;
      case "inactive": return <Chip label="Pasif" color="default" size="small" />;
      default: return <Chip label={status} size="small" />;
    }
  };
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ürün Yönetimi
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Mağazanızdaki ürünleri düzenleyin ve yeni ürünler ekleyin
        </Typography>
      </Box>
      {/* İstatistik Kartları */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Inventory sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{products.length}</Typography>
                  <Typography variant="body2">Toplam Ürün</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Category sx={{ fontSize: 40, color: '#2e7d32', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{new Set(products.map(p => p.category)).size}</Typography>
                  <Typography variant="body2">Kategori</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Inventory sx={{ fontSize: 40, color: '#ed6c02', mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    {products.filter(p => p.status === 'out_of_stock').length}
                  </Typography>
                  <Typography variant="body2">Stokta Olmayan</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Inventory sx={{ fontSize: 40, color: '#9c27b0', mr: 2 }} />
                <Box>
                  <Typography variant="h4">
                    {products.reduce((total, p) => total + p.sales, 0)}
                  </Typography>
                  <Typography variant="body2">Toplam Satış</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Ürün Listesi
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Yeni Ürün Ekle
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>Stok</TableCell>
              <TableCell>Satış</TableCell>
              <TableCell>Barkod</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price} ₺</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>{product.barcode}</TableCell>
                <TableCell>{getStatusChip(product.status)}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpenDialog(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteProduct(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Ürün Düzenleme/Ekleme Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Ürün Adı"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Fiyat"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Stok"
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Kategori"
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Barkod"
            value={newProduct.barcode}
            onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button variant="contained" onClick={handleSaveProduct}>
            {editingProduct ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default ProductManagement;