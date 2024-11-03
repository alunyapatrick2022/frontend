import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';

const Products = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
