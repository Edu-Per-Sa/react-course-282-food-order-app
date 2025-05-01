import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: {
        items: []
    },
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {}
})

export default function CartContextProvider({ children }) {

    const [cart, setCart] = useState({ items: [] });

    function addItem(meal) {
        setCart((prevCart) => {
            const newCartItems = [...prevCart.items];

            const indexItem = newCartItems.findIndex((item) => item.id === meal.id);

            if (indexItem >= 0) {

                const updatedItem = {
                    ...newCartItems[indexItem],
                    quantity: newCartItems[indexItem].quantity + 1
                };

                newCartItems[indexItem] = updatedItem;

            } else {
                newCartItems.unshift({
                    id: meal.id,
                    name: meal.name,
                    quantity: 1,
                    price: meal.price
                })
            }

            return { items: [...newCartItems] };
        })
    }

    function removeItem (id) {
        setCart((prevCart) => {

            const newCartItems = [...prevCart.items];

            const indexItem = newCartItems.findIndex((item) => item.id === id);
            const quatityItem = newCartItems[indexItem].quantity;

            if (quatityItem > 1) {

                const updatedItem = {
                    ...newCartItems[indexItem],
                    quantity: newCartItems[indexItem].quantity - 1
                };

                newCartItems[indexItem] = updatedItem;

            } else {
                newCartItems.splice(indexItem, 1);
            }

            return { items: [...newCartItems] };
        })
    }

    function clearCart () {
        setCart({ items: [] });
    }

    const cartContext = {
        cart: cart,
        addItem,
        removeItem,
        clearCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}