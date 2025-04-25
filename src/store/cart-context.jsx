import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: {
        items: [],
        total: 0
    },
    addItem: () => { },
})

export default function CartContextProvider({ children }) {

    const [cart, setCart] = useState({items: [], totalPrice: 0});

    function addItem(meal) {
        setCart((prevCart) => {
            const newCartItems = [...prevCart.items];

            const indexItem = newCartItems.findIndex((item) => item.id == meal.id);

            if (indexItem >= 0) {
                newCartItems[indexItem].quantity += 1
            } else {
                newCartItems.unshift({
                    id: meal.id,
                    name: meal.name,
                    quantity: 1,
                    price: meal.price
                })
            }
            
            const totalPrice = newCartItems.reduce((acumulator, item) => acumulator + (item.price * item.quantity), 0);

            return {items: [...newCartItems], totalPrice };
        })
    }

    

    const cartContext = {
        cart: cart,
        addItem,
    };

    console.log("cartItems --> ",cart.items, "total ->", cart.totalPrice );

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}