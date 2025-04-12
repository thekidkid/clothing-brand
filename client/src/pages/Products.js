import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Slider,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
  Paper,
  CircularProgress,
  Alert,
  InputAdornment,
  Chip,
  Collapse,
  Divider,
  Card,
  CardContent,
  Stack,
  Rating,
} from '@mui/material';
import { 
  FilterList, 
  Close, 
  ShoppingCart, 
  Search,
  Checkroom,
  LocalOffer,
  Favorite,
  ShoppingBag,
  Palette,
  Style,
  DryCleaningOutlined,
  CheckroomOutlined,
  AccessibilityNew,
  LocalMall,
  ExpandMore,
  ExpandLess,
  Category,
  Straighten,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Helper function to get icon by category
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 't-shirts':
      return <DryCleaningOutlined sx={{ fontSize: 80 }} />;
    case 'jackets':
      return <CheckroomOutlined sx={{ fontSize: 80 }} />;
    case 'dresses':
      return <AccessibilityNew sx={{ fontSize: 80 }} />;
    default:
      return <Style sx={{ fontSize: 80 }} />;
  }
};

// Mock product data (replace with API call)
const initialProducts = [
  {
    id: 1,
    name: 'Bear Logo T-Shirt',
    price: 39.99,
    description: 'Premium cotton t-shirt featuring our iconic bear logo',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black'],
    inStock: true,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 12,
    images: {
      front: 'images/bearshirt2.png',
      back: 'images/bearshirt.png'
    },
    tags: ['New', 'Featured', 'Best Seller']
  }
];

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Collapse states for filter sections
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    sizes: true,
    colors: true,
    price: true
  });

  // Categories and other filter options
  const categories = ['T-Shirts', 'Jackets', 'Dresses', 'Pants', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['White', 'Black', 'Gray', 'Blue', 'Red', 'Pink', 'Floral'];

  // Fetch products (simulate API call)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(initialProducts);
        setFilteredProducts(initialProducts);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
        setIsLoaded(true);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Price range filter
    result = result.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }

    // Sorting
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategories, priceRange, selectedSizes, selectedColors, inStockOnly, sortBy]);

  // Handler functions
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
    setInStockOnly(false);
    setSortBy('');
    setSearchQuery('');
  };

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  return (
    <Fade in={isLoaded} timeout={1000}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#0A0A0A', pb: 8 }}>
        <Container maxWidth="xl" sx={{ pt: 4 }}>
          {/* Search and Sort Controls */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              mb: 4,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'rgba(255,255,255,0.7)' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,99,71,0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6347',
                      },
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    displayEmpty
                    sx={{
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,99,71,0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6347',
                      },
                    }}
                  >
                    <MenuItem value="">Sort By</MenuItem>
                    <MenuItem value="price_asc">Price: Low to High</MenuItem>
                    <MenuItem value="price_desc">Price: High to Low</MenuItem>
                    <MenuItem value="name_asc">Name: A to Z</MenuItem>
                    <MenuItem value="name_desc">Name: Z to A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setDrawerOpen(true)}
                  startIcon={<FilterList />}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': {
                      borderColor: '#FF6347',
                      backgroundColor: 'rgba(255,99,71,0.1)',
                    },
                  }}
                >
                  Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Products Grid */}
          <Grid container spacing={4}>
            {!isMobile && (
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    position: 'sticky',
                    top: 90,
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                    Filters
                  </Typography>

                  {/* Categories */}
                  <Box sx={{ mb: 3 }}>
                    <Box 
                      onClick={() => toggleFilter('categories')}
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        mb: 2,
                        color: 'white'
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Category sx={{ mr: 1, fontSize: 20, color: '#FF6347' }} />
                        Categories
                      </Typography>
                      {expandedFilters.categories ? <ExpandLess sx={{ color: '#FF6347' }} /> : <ExpandMore sx={{ color: '#FF6347' }} />}
                    </Box>
                    <Collapse in={expandedFilters.categories}>
                      <List dense>
                        {categories.map((category) => (
                          <ListItem 
                            key={category} 
                            dense 
                            sx={{
                              borderRadius: 1,
                              '&:hover': {
                                background: 'rgba(255,99,71,0.1)'
                              }
                            }}
                          >
                            <Checkbox
                              checked={selectedCategories.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                              sx={{
                                color: 'rgba(255,255,255,0.3)',
                                '&.Mui-checked': {
                                  color: '#FF6347',
                                }
                              }}
                            />
                            <ListItemText 
                              primary={category} 
                              sx={{ 
                                '& .MuiListItemText-primary': { 
                                  color: 'rgba(255,255,255,0.9)',
                                  fontSize: '0.9rem'
                                }
                              }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                  {/* Sizes */}
                  <Box sx={{ mb: 3 }}>
                    <Box 
                      onClick={() => toggleFilter('sizes')}
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        mb: 2,
                        color: 'white'
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Straighten sx={{ mr: 1, fontSize: 20, color: '#FF6347' }} />
                        Sizes
                      </Typography>
                      {expandedFilters.sizes ? <ExpandLess sx={{ color: '#FF6347' }} /> : <ExpandMore sx={{ color: '#FF6347' }} />}
                    </Box>
                    <Collapse in={expandedFilters.sizes}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {sizes.map((size) => (
                          <Chip
                            key={size}
                            label={size}
                            onClick={() => handleSizeChange(size)}
                            sx={{
                              background: selectedSizes.includes(size) ? 'rgba(255,99,71,0.2)' : 'rgba(255,255,255,0.03)',
                              color: selectedSizes.includes(size) ? '#FF6347' : 'white',
                              border: '1px solid',
                              borderColor: selectedSizes.includes(size) ? '#FF6347' : 'rgba(255,255,255,0.1)',
                              '&:hover': {
                                background: 'rgba(255,99,71,0.1)',
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Collapse>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                  {/* Colors */}
                  <Box sx={{ mb: 3 }}>
                    <Box 
                      onClick={() => toggleFilter('colors')}
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        mb: 2,
                        color: 'white'
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Palette sx={{ mr: 1, fontSize: 20, color: '#FF6347' }} />
                        Colors
                      </Typography>
                      {expandedFilters.colors ? <ExpandLess sx={{ color: '#FF6347' }} /> : <ExpandMore sx={{ color: '#FF6347' }} />}
                    </Box>
                    <Collapse in={expandedFilters.colors}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {colors.map((color) => (
                          <Chip
                            key={color}
                            label={color}
                            onClick={() => handleColorChange(color)}
                            sx={{
                              background: selectedColors.includes(color) ? 'rgba(255,99,71,0.2)' : 'rgba(255,255,255,0.03)',
                              color: selectedColors.includes(color) ? '#FF6347' : 'white',
                              border: '1px solid',
                              borderColor: selectedColors.includes(color) ? '#FF6347' : 'rgba(255,255,255,0.1)',
                              '&:hover': {
                                background: 'rgba(255,99,71,0.1)',
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Collapse>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                  {/* Price Range */}
                  <Box>
                    <Box 
                      onClick={() => toggleFilter('price')}
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        mb: 2,
                        color: 'white'
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalOffer sx={{ mr: 1, fontSize: 20, color: '#FF6347' }} />
                        Price Range
                      </Typography>
                      {expandedFilters.price ? <ExpandLess sx={{ color: '#FF6347' }} /> : <ExpandMore sx={{ color: '#FF6347' }} />}
                    </Box>
                    <Collapse in={expandedFilters.price}>
                      <Box sx={{ px: 2 }}>
                        <Slider
                          value={priceRange}
                          onChange={handlePriceChange}
                          valueLabelDisplay="auto"
                          min={0}
                          max={500}
                          sx={{
                            color: '#FF6347',
                            '& .MuiSlider-thumb': {
                              backgroundColor: '#FF6347',
                            },
                            '& .MuiSlider-track': {
                              backgroundColor: '#FF6347',
                            },
                            '& .MuiSlider-rail': {
                              backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                            '& .MuiSlider-valueLabel': {
                              backgroundColor: '#FF6347',
                            }
                          }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            ${priceRange[0]}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            ${priceRange[1]}
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={resetFilters}
                    sx={{
                      mt: 2,
                      background: 'linear-gradient(45deg, #FF6347 30%, #FFB6C1 90%)',
                      borderRadius: '10px',
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF6347 60%, #FFB6C1 100%)',
                      }
                    }}
                  >
                    Reset Filters
                  </Button>
                </Paper>
              </Grid>
            )}

            <Grid item xs={12} md={!isMobile ? 9 : 12}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress sx={{ color: '#FF6347' }} />
                </Box>
              ) : error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              ) : filteredProducts.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    No products found
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={resetFilters}
                    sx={{
                      background: 'linear-gradient(45deg, #FF6347 30%, #FFB6C1 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF6347 60%, #FFB6C1 100%)',
                      },
                    }}
                  >
                    Reset Filters
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={4}>
                  {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>

        {/* Filter Drawer for Mobile */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: '80%',
              maxWidth: 360,
              bgcolor: '#0A0A0A',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              p: 3
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              Filters
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Categories */}
          <Box sx={{ mb: 3 }}>
            <Box 
              onClick={() => toggleFilter('categories')}
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                mb: 2,
                color: 'white'
              }}
            >
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                <Category sx={{ mr: 1, fontSize: 20, color: '#FF6347' }} />
                Categories
              </Typography>
              {expandedFilters.categories ? <ExpandLess sx={{ color: '#FF6347' }} /> : <ExpandMore sx={{ color: '#FF6347' }} />}
            </Box>
            <Collapse in={expandedFilters.categories}>
              <List dense>
                {categories.map((category) => (
                  <ListItem 
                    key={category} 
                    dense 
                    sx={{
                      borderRadius: 1,
                      '&:hover': {
                        background: 'rgba(255,99,71,0.1)'
                      }
                    }}
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      sx={{
                        color: 'rgba(255,255,255,0.3)',
                        '&.Mui-checked': {
                          color: '#FF6347',
                        }
                      }}
                    />
                    <ListItemText 
                      primary={category} 
                      sx={{ 
                        '& .MuiListItemText-primary': { 
                          color: 'rgba(255,255,255,0.9)',
                          fontSize: '0.9rem'
                        }
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Sizes */}
          <Box sx={{ mb: 3 }}>
            <Box 
              onClick={() => toggleFilter('sizes')}
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                mb: 2,
                color: 'white'
              }}
            >
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                <Straighten sx={{ mr: 1, fontSize: 20, color: '#FF6347' }} />
                Sizes
              </Typography>
              {expandedFilters.sizes ? <ExpandLess sx={{ color: '#FF6347' }} /> : <ExpandMore sx={{ color: '#FF6347' }} />}
            </Box>
            <Collapse in={expandedFilters.sizes}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {sizes.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    onClick={() => handleSizeChange(size)}
                    sx={{
                      background: selectedSizes.includes(size) ? 'rgba(255,99,71,0.2)' : 'rgba(255,255,255,0.03)',
                      color: selectedSizes.includes(size) ? '#FF6347' : 'white',
                      border: '1px solid',
                      borderColor: selectedSizes.includes(size) ? '#FF6347' : 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        background: 'rgba(255,99,71,0.1)',
                      }
                    }}
                  />
                ))}
              </Box>
            </Collapse>
          </Box>

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Colors */}
          <Box sx={{ mb: 3 }}>
            <Box 
              onClick={() => toggleFilter('colors')}
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                mb: 2,
                color: 'white'
              }}
            >
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                <Palette sx={{ mr: 1, fontSize: 20, color: '#FF6347' }} />
                Colors
              </Typography>
              {expandedFilters.colors ? <ExpandLess sx={{ color: '#FF6347' }} /> : <ExpandMore sx={{ color: '#FF6347' }} />}
            </Box>
            <Collapse in={expandedFilters.colors}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {colors.map((color) => (
                  <Chip
                    key={color}
                    label={color}
                    onClick={() => handleColorChange(color)}
                    sx={{
                      background: selectedColors.includes(color) ? 'rgba(255,99,71,0.2)' : 'rgba(255,255,255,0.03)',
                      color: selectedColors.includes(color) ? '#FF6347' : 'white',
                      border: '1px solid',
                      borderColor: selectedColors.includes(color) ? '#FF6347' : 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        background: 'rgba(255,99,71,0.1)',
                      }
                    }}
                  />
                ))}
              </Box>
            </Collapse>
          </Box>

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Price Range */}
          <Box sx={{ mb: 3 }}>
            <Box 
              onClick={() => toggleFilter('price')}
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                mb: 2,
                color: 'white'
              }}
            >
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalOffer sx={{ mr: 1, fontSize: 20, color: '#FF6347' }} />
                Price Range
              </Typography>
              {expandedFilters.price ? <ExpandLess sx={{ color: '#FF6347' }} /> : <ExpandMore sx={{ color: '#FF6347' }} />}
            </Box>
            <Collapse in={expandedFilters.price}>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={500}
                  sx={{
                    color: '#FF6347',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#FF6347',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#FF6347',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: '#FF6347',
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    ${priceRange[0]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    ${priceRange[1]}
                  </Typography>
                </Box>
              </Box>
            </Collapse>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              resetFilters();
              setDrawerOpen(false);
            }}
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #FF6347 30%, #FFB6C1 90%)',
              borderRadius: '10px',
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #FF6347 60%, #FFB6C1 100%)',
              }
            }}
          >
            Reset Filters
          </Button>
        </Drawer>
      </Box>
    </Fade>
  );
};

export default Products; 