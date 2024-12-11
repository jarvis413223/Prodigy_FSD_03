// Backend Code for E-commerce Website
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10 },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 20 },
];

let cart = [];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Add a product to the cart
app.post('/cart', (req, res) => {
  const { id } = req.body;
  const product = products.find(p => p.id === id);
  if (product) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    res.status(200).json({ message: 'Product added to cart', cart });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get cart items
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Remove an item from the cart
app.delete('/cart/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = cart.findIndex(item => item.id === parseInt(id));
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    res.status(200).json({ message: 'Product removed from cart', cart });
  } else {
    res.status(404).json({ message: 'Product not found in cart' });
  }
});

// Checkout cart
app.post('/checkout', (req, res) => {
  if (cart.length === 0) {
    res.status(400).json({ message: 'Cart is empty' });
  } else {
    cart = [];
    res.status(200).json({ message: 'Checkout successful' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
