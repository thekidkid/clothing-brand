import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';

const Profile = () => {
  const [tab, setTab] = useState(0);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  });

  // Mock order history
  const orders = [
    {
      id: '#12345',
      date: '2024-04-10',
      total: 129.98,
      status: 'Delivered',
      items: [
        { name: 'Classic White T-Shirt', quantity: 2, price: 29.99 },
        { name: 'Denim Jacket', quantity: 1, price: 89.99 },
      ],
    },
    {
      id: '#12344',
      date: '2024-04-05',
      total: 159.97,
      status: 'Processing',
      items: [
        { name: 'Summer Dress', quantity: 1, price: 59.99 },
        { name: 'Leather Belt', quantity: 1, price: 39.99 },
      ],
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Updated profile:', profileData);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab label="Profile" />
              <Tab label="Orders" />
              <Tab label="Settings" />
            </Tabs>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {tab === 0 && (
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>
              <form onSubmit={handleProfileUpdate}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, firstName: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, lastName: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Shipping Address
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      value={profileData.address.street}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: { ...profileData.address, street: e.target.value },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={profileData.address.city}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: { ...profileData.address, city: e.target.value },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      value={profileData.address.state}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: { ...profileData.address, state: e.target.value },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="ZIP Code"
                      value={profileData.address.zipCode}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: { ...profileData.address, zipCode: e.target.value },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={profileData.address.country}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: { ...profileData.address, country: e.target.value },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          )}

          {tab === 1 && (
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Order History
              </Typography>
              <List>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Typography variant="h6">Order {order.id}</Typography>
                            <Chip
                              label={order.status}
                              color={
                                order.status === 'Delivered' ? 'success' : 'primary'
                              }
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {order.date}
                            </Typography>
                            {order.items.map((item) => (
                              <Typography key={item.name} variant="body2">
                                {item.quantity}x {item.name} - ${item.price}
                              </Typography>
                            ))}
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                              Total: ${order.total}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}

          {tab === 2 && (
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Account Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Change Password"
                    secondary="Update your password regularly to keep your account secure"
                  />
                  <Button variant="outlined">Change</Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Manage your email preferences"
                  />
                  <Button variant="outlined">Manage</Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Delete Account"
                    secondary="Permanently delete your account and all data"
                  />
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </ListItem>
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 