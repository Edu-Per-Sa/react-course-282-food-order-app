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

    const { items, addItem, removeItem } = useContext(CartContext);
    const { modalText, closeModal, showModal } = useContext(ModalContext);


    const totalPrice = fnTotalPrice(items);

    let cartInfo = <EmptyInfo>
        <p> Ther is no elements in the cart. </p>
        <p> Please select at least one in the menu... </p>
    </EmptyInfo>

    if (items.length > 0) {
        cartInfo = <ul className={styles["cart-item-container"]}>
            {items.map((item) =>
                <li className={styles["cart-item"]} key={item.id}>
                    <p className={styles["cart-item-info"]}>
                        {item.name} - {item.quantity} x {formattingPrice(item.price)}
                    </p>
                    <span className={styles["cart-item-actions"]}>
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
                <p className={styles["cart-price"]}>
                    <span> TOTAL </span>
                    <span> {formattingPrice(totalPrice)} </span>
                </p>
                <div className={styles["cart-button-actions"]}>
                    <Button onlyText onClick={() => closeModal()}> CLOSE </Button>
                    {items.length > 0 ? <Button onClick={() => showModal("checkout")}> Go to checkout </Button> : null}
                </div>
            </div>
        </Modal>
    );

}