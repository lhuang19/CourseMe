/**
 * 
 * Manages cart information
 * Stores cart
 * Stores function to set cart
 * Reducer to control add and reorder cart
 * Passes relevant info to consumers
 * 
 */

import React, { useReducer } from 'react';

type CartState = {
    cart: Array<string>;
    setCart: (action: Action) => void;
};

type Action = {
    type: string;
    data: string;
};

const cartReducer = (prev: CartState, action: Action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...prev,
                cart: [...prev.cart, action.data],
            };
        case 'REMOVE':
            return {
                ...prev,
                cart: prev.cart.filter((id) => id !== action.data),
            };
        case 'REORDER':
            const num = action.data.split(' ');
            const start = Number(num[0]);
            const end = Number(num[1]);
            const tempArr = [...prev.cart];
            const [removed] = tempArr.splice(start, 1);
            tempArr.splice(end, 0, removed);
            return {
                ...prev,
                cart: tempArr,
            };
        case 'CLEAR':
            return {
                ...prev,
                cart: [],
            };
        default:
            throw new Error('Something went wrong');
    }
};

export const CartContext = React.createContext({
    cart: Array<string>(),
    setCart: (action: Action) => {},
});

export const CartContextProvider = (props: { children: JSX.Element }) => {
    const [cart, setCart] = useReducer(cartReducer, {
        cart: [],
        setCart: (input) => {
            setCart({ type: input.type, data: input.data });
        },
    });
    return (
        <CartContext.Provider value={cart}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
