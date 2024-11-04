import React from 'react';

const Cart = ({ cartItems, totalAmount, onCheckout }) => (
    <div>
        <h2>Cart</h2>
        <ul>
            {cartItems.map(item => (
                <li key={item.id}>
                    {item.name} - ${item.price}
                </li>
            ))}
        </ul>
        <h3>Total: ${totalAmount}</h3>
        <button onClick={onCheckout}>Checkout</button>
    </div>
);

export default Cart;
