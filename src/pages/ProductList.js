import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Box, Drawer, Chip, CircularProgress } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import ProductCard from '../components/product/ProductCard';
import ProductFilter from '../components/product/ProductFilter';
import { productService } from '../services/firebaseService';

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const searchParams = location.state?.search;
    const barcode = location.state?.barcode;

    if (barcode) {
      handleBarcodeSearch(barcode);
    } else if (searchParams) {
      handleSearch(searchParams);
    }
  }, [location]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await productService.getProducts({ isActive: true });
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    applyFilters(filters, searchTerm);
  };

  const handleSearch = (searchData) => {
    setSearchTerm(searchData.term);
    applyFilters(activeFilters, searchData.term);
  };

  const handleBarcodeSearch = async (barcode) => {
    try {
      setLoading(true);
      const product = await productService.getProductByBarcode(barcode);
      if (product) {
        setFilteredProducts([product]);
        setSearchTerm(`Barkod: ${barcode}`);
      } else {
        setFilteredProducts([]);
        setSearchTerm(`Barkod: ${barcode} - Bulunamadı`);
      }
    } catch (error) {
      console.error('Barkod aramasında hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (filters, term = '') => {
    let filtered = products;

    // Metin araması
    if (term) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase()) ||
        product.brand.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Fiyat filtresi
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
      );
    }

    // Kategori filtresi
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Mağaza filtresi
    if (filters.stores && filters.stores.length > 0) {
      filtered = filtered.filter(product => 
        filters.stores.includes(product.storeId)
      );
    }

    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredProducts(products);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterList sx={{ mr: 1 }} />
          <Typography variant="h4" component="h1">
            Ürünler
          </Typography>
        </Box>

        {searchTerm && (
          <Chip
            label={`Arama: "${searchTerm}"`}
            onDelete={clearSearch}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Filtreler - Masaüstü */}
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <ProductFilter onFilterChange={handleFilterChange} />
        </Grid>

        {/* Ürünler */}
        <Grid item xs={12} md={9}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {filteredProducts.length} ürün bulundu
          </Typography>
          
          {filteredProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h6" color="textSecondary">
                Aradığınız kriterlere uygun ürün bulunamadı.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Mobil Filtreler */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <ProductFilter onFilterChange={handleFilterChange} />
        </Box>
      </Drawer>
    </Container>
  );
};

export default ProductList;