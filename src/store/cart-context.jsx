import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: {
        items: [],
        totalPrice: 0
    },
    addItem: () => {},
    removeItem: () => {}
})

export default function CartContextProvider({ children }) {

    const [cart, setCart] = useState({ items: [], totalPrice: 0 });


    function fnTotalPrice(items) {
        return items.reduce((acumulator, item) => acumulator + item.price * item.quantity, 0);
    }

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

            const totalPrice = fnTotalPrice(newCartItems);
            return { items: [...newCartItems], totalPrice };
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

            const totalPrice = fnTotalPrice(newCartItems);
            return { items: [...newCartItems], totalPrice };
        })
    }

    const cartContext = {
        cart: cart,
        addItem,
        removeItem,
    };

    // console.log("cartItems --> ", cart.items, "total ->", cart.totalPrice);

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}