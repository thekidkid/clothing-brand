import fetch from 'node-fetch';

async function addSampleProduct() {
  try {
    const response = await fetch('http://localhost:5000/api/admin/products/sample', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Sample product added:', data);
  } catch (error) {
    console.error('Error adding sample product:', error);
  }
}

addSampleProduct(); 