import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Link as LinkIcon,
  Image as ImageIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    sizes: [],
    colors: [],
    websiteUrl: '',
    stockQuantity: 0,
    images: [],
    tags: []
  });

  const categories = ['T-Shirts', 'Jackets', 'Dresses', 'Pants', 'Accessories'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = ['White', 'Black', 'Gray', 'Blue', 'Red', 'Pink'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        sizes: product.sizes,
        colors: product.colors,
        websiteUrl: product.websiteUrl,
        stockQuantity: product.stockQuantity,
        tags: product.tags
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        sizes: [],
        colors: [],
        websiteUrl: '',
        stockQuantity: 0,
        images: [],
        tags: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultipleSelect = (event, field) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value.split(',') : value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(image => {
            formDataToSend.append('images', image);
          });
        } else if (Array.isArray(formData[key])) {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const url = selectedProduct
        ? `/api/admin/products/${selectedProduct._id}`
        : '/api/admin/products';
      
      const method = selectedProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Failed to save product');

      fetchProducts();
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete product');

      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Product Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF5252, #45B7AF)',
              }
            }}
          >
            Add New Product
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Box 
                  sx={{ 
                    position: 'relative',
                    paddingTop: '60%',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    backgroundImage: product.images[0] ? `url(${product.images[0]})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip 
                      label={`$${product.price}`}
                      size="small"
                      sx={{ 
                        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                        color: 'white'
                      }}
                    />
                    <Chip 
                      label={product.category}
                      size="small"
                      sx={{ background: 'rgba(255,255,255,0.1)' }}
                    />
                  </Stack>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Stock: {product.stockQuantity}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      component="a" 
                      href={product.websiteUrl}
                      target="_blank"
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        color: '#4ECDC4',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      <LinkIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      View on Website
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(product)}
                    sx={{ color: '#4ECDC4' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(product._id)}
                    sx={{ color: '#FF6B6B' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              background: '#1A1A1A',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))',
            }
          }}
        >
          <DialogTitle>
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogContent dividers>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Product Name"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Sizes</InputLabel>
                    <Select
                      multiple
                      value={formData.sizes}
                      onChange={(e) => handleMultipleSelect(e, 'sizes')}
                      label="Sizes"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {availableSizes.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Colors</InputLabel>
                    <Select
                      multiple
                      value={formData.colors}
                      onChange={(e) => handleMultipleSelect(e, 'colors')}
                      label="Colors"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {availableColors.map((color) => (
                        <MenuItem key={color} value={color}>
                          {color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="websiteUrl"
                    label="Website URL"
                    fullWidth
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="stockQuantity"
                    label="Stock Quantity"
                    type="number"
                    fullWidth
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<ImageIcon />}
                    sx={{ mt: 1 }}
                  >
                    Upload Images
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  {formData.images.length > 0 && (
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      {formData.images.length} images selected
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={handleSubmit}
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF5252, #45B7AF)',
                }
              }}
            >
              {selectedProduct ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Dashboard; 