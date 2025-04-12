const mockProducts = [
  {
    id: 1,
    name: 'Bear Logo T-Shirt',
    price: 39.99,
    description: 'Premium cotton t-shirt featuring our iconic bear logo. Made from 100% organic cotton for maximum comfort and durability. Each shirt is carefully crafted with attention to detail and quality.',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black'],
    inStock: true,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 12,
    images: {
      front: '/images/bearshirt2.png',
      back: '/images/bearshirt.png'
    },
    tags: ['New', 'Featured', 'Best Seller'],
    features: [
      '100% Organic Cotton',
      'Premium Quality Print',
      'Comfortable Fit',
      'Machine Washable',
      'Pre-shrunk Fabric',
      'Eco-friendly Manufacturing'
    ]
  },
  // ... existing products ...
];

export default mockProducts; 