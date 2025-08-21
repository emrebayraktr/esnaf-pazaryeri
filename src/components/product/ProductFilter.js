// src/components/product/ProductFilter.js
import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  TextField,
  Button
} from '@mui/material';
import { ExpandMore, FilterList } from '@mui/icons-material';

const ProductFilter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);

  const categories = ['Elektronik', 'Ev & Yaşam', 'Giyim', 'Spor', 'Kitap', 'Diğer'];
  const stores = ['TeknoMarket', 'EvGerek', 'TeknoSaati', 'MobilyaDünyası'];

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories });
  };

  const handleStoreChange = (store) => {
    const newStores = selectedStores.includes(store)
      ? selectedStores.filter(s => s !== store)
      : [...selectedStores, store];
    
    setSelectedStores(newStores);
    onFilterChange({ stores: newStores });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange({ priceRange: newValue });
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedCategories([]);
    setSelectedStores([]);
    onFilterChange({ 
      priceRange: [0, 10000],
      categories: [],
      stores: []
    });
  };

  return (
    <Box sx={{ width: 300 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          <FilterList sx={{ mr: 1 }} />
          Filtreler
        </Typography>
        <Button size="small" onClick={clearFilters}>
          Temizle
        </Button>
      </Box>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Fiyat Aralığı</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={100}
            valueLabelFormat={(value) => `${value} ₺`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{priceRange[0]} ₺</Typography>
            <Typography variant="body2">{priceRange[1]} ₺</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Kategoriler</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={category}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Mağazalar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {stores.map((store) => (
            <FormControlLabel
              key={store}
              control={
                <Checkbox
                  checked={selectedStores.includes(store)}
                  onChange={() => handleStoreChange(store)}
                />
              }
              label={store}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductFilter;