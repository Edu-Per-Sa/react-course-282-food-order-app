import { useContext } from "react";
import styles from "./Cart.module.css";

import Modal from "../../UI/Modal/Modal.jsx";
import Button from "../../UI/Button/Button.jsx"
import { CartContext } from "../../store/cart-context";
import { ModalContext } from "../../store/modal-context.jsx";
import { formattingPrice } from "../../util/fotmattingPrice";
import EmptyInfo from "../EmptyInfo/EmptyInfo.jsx";

function fnTotalPrice(items) {
    return items.reduce((acumulator, item) => acumulator + item.price * item.quantity, 0);
}

export default function Cart() {

    const { cart, addItem, removeItem } = useContext(CartContext);
    const { modalText, closeModal, showModal } = useContext(ModalContext);


    const totalPrice = fnTotalPrice(cart.items);

    let cartInfo = <EmptyInfo>
        <p> Ther is no elements in the cart. </p>
        <p> Please select at least one in the menu... </p>
    </EmptyInfo>

    if (cart.items.length > 0) {
        cartInfo = <ul className={styles["cart-item-container"]}>
            {cart.items.map((item) =>
                <li className={styles["cart-item"]} key={item.id}>
                    <p>
                        {item.name} - {item.quantity} x {formattingPrice(item.price)}
                    </p>
                    <span>
                        <button onClick={() => addItem(item)}> + </button>
                        <span> {item.quantity} </span>
                        <button onClick={() => removeItem(item.id)}> - </button>
                    </span>
                </li>
            )}
        </ul>
    }

    return (
        <Modal openModal={modalText === "cart"} onClose={modalText === "cart" ? closeModal : null}>
            <div className={styles["cart-container"]}>
                <h3> YOUR CART </h3>
                {cartInfo}
                <p>
                    TOTAL {formattingPrice(totalPrice)}
                </p>
                <div className={styles["button-actions"]}>
                    <Button onClick={() => closeModal()}> CLOSE </Button>
                    {cart.items.length > 0 ? <Button onClick={() => showModal("checkout")}> Go to checkout </Button> : null}
                </div>
            </div>
        </Modal>
    );

}