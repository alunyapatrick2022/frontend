import React, { useState } from 'react';
import { checkout } from '../api';

const Checkout = ({ cartTotal, onPaymentInitiated }) => {
    const [phone, setPhone] = useState('');

    const handleCheckout = async () => {
        try {
            const { data } = await checkout(phone, cartTotal);
            onPaymentInitiated(data.message);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleCheckout}>Confirm Payment</button>
        </div>
    );
};

export default Checkout;
