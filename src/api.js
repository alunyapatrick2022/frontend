// src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

// Fetch products
export const fetchProducts = () => API.get('/products');

// Checkout request to initiate M-Pesa payment
export const checkout = (phone, cartTotal) =>
    API.post('/checkout', { phone, cartTotal });
