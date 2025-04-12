# Clothing Brand E-commerce Website

A modern e-commerce website for a clothing brand built with React, Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product catalog with categories
- Shopping cart functionality
- Secure payment processing with Stripe
- Order management
- Responsive design
- Image upload for products

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Stripe account

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/clothing-brand
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Start the development server:
   ```bash
   # Start backend
   npm run dev

   # Start frontend (in a new terminal)
   npm run client
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create new product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product

### Orders
- GET /api/orders - Get all orders
- GET /api/orders/user/:userId - Get user's orders
- GET /api/orders/:id - Get single order
- POST /api/orders - Create new order
- PUT /api/orders/:id/status - Update order status

### Payments
- POST /api/payments/create-payment-intent - Create Stripe payment intent
- POST /api/payments/webhook - Handle Stripe webhooks

## Frontend Setup

The frontend is built with React and includes:
- Redux for state management
- React Router for navigation
- Material-UI for styling
- Axios for API calls

## Security

- JWT authentication
- Password hashing with bcrypt
- Secure payment processing with Stripe
- Input validation
- CORS protection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 