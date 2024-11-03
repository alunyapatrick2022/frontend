// src/App.js
import React, { useState } from 'react';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [message, setMessage] = useState('');

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = () => setIsCheckingOut(true);

    const onPaymentInitiated = (msg) => {
        setMessage(msg);
        setCartItems([]);
        setIsCheckingOut(false);
    };

    return (
        <div>
            <h1>M-Pesa Payment Integration</h1>
            <Products addToCart={addToCart} />
            <Cart cartItems={cartItems} totalAmount={totalAmount} onCheckout={handleCheckout} />
            {isCheckingOut && (
                <Checkout cartTotal={totalAmount} onPaymentInitiated={onPaymentInitiated} />
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;
