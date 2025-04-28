import { useContext } from "react";
import styles from "./Cart.module.css";
import Button from "../../UI/Button/Button.jsx"

import { CartContext } from "../../store/cart-context";
import { formattingPrice } from "../../util/fotmattingPrice";

export default function Cart() {

    const { cart, addItem, removeItem } = useContext(CartContext);

    return (
        <div>
            <div className={styles["cart-container"]}>
                <h3> YOUR CART </h3>
                {cart.items.length === 0 && <span> No hay elementos en el carrito... </span>}

                {cart.items.length > 0 &&
                    <>
                        <ul>
                            {cart.items.map((item) =>
                                <li key={item.id}>
                                    <span>
                                        {item.name} - {item.quantity} x {formattingPrice(item.price)}
                                    </span>
                                    <span>
                                        <button onClick={() => addItem(item)}> + </button>
                                        <span> {item.quantity} </span>
                                        <button onClick={() => removeItem(item.id)}> - </button>
                                    </span>
                                </li>
                            )}
                        </ul>
                        <p>
                            {formattingPrice(cart.totalPrice)}
                        </p>
                    </>
                }
                <div>
                    <Button> CLOSE </Button>
                    <Button disabled={!cart.items.length > 0}> Go to checkout </Button>
                </div>
            </div>
        </div>
    );

}