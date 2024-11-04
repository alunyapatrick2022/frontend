const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Product data
const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
];

// Get products
app.get('/products', (req, res) => res.json(products));

// Daraja API functions
const getAccessToken = async () => {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        auth: {
            username: process.env.CONSUMER_KEY,
            password: process.env.CONSUMER_SECRET,
        },
    });
    return response.data.access_token;
};

const getTimestamp = () => {
    return new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
};

app.post('/checkout', async (req, res) => {
    const { phone, cartTotal } = req.body;
    try {
        const accessToken = await getAccessToken();
        const timestamp = getTimestamp();
        const password = Buffer.from(`${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`).toString('base64');

        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                BusinessShortCode: process.env.SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: cartTotal,
                PartyA: phone,
                PartyB: process.env.SHORTCODE,
                PhoneNumber: phone,
                CallBackURL: process.env.CALLBACK_URL,
                AccountReference: 'CartCheckout',
                TransactionDesc: 'Checkout payment',
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        res.status(200).json({ success: true, message: 'Checkout initiated', data: response.data });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ success: false, message: 'Checkout failed', error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
