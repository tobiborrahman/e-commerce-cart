'use client'

import React, { useEffect, useState } from 'react';
import Cart from '@/components/Cart/Cart';
import { Product } from '@/types/product';

const CartPage: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        // Retrieve cart data from local storage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (cartItemId: string) => {
        const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
        setCart(updatedCart);
        // Update local storage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <>
            <Cart cart={cart} removeFromCart={removeFromCart} alignment='end' />
        </>
    );
};

export default CartPage;
