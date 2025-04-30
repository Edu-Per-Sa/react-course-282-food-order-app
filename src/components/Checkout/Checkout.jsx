import { useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Checkout.module.css";

import { ModalContext } from "../../store/modal-context";
import { CartContext } from "../../store/cart-context.jsx";
import Modal from "../../UI/Modal/Modal.jsx";
import Input from "../../UI/Input/Input.jsx";
import useHttp from "../../hooks/Http/useHttp.js";

export default function Checkout() {

    const { modalText, closeModal } = useContext(ModalContext);
    const { cart } = useContext(CartContext);

    const formRef = useRef();

    const { sendRequest, error, data: respData, isFetching } = useHttp([]);

    async function handleOrder(event) {
        event.preventDefault();
        const formDataObj = new FormData(event.target);
        const data = Object.fromEntries(formDataObj.entries());

        await sendRequest(
            "http://localhost:3000/orders",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order: {
                        items: cart.items,
                        customer: { ...data }
                    }
                })
            }
        );

        formRef.current.reset();
    }

    return (
        createPortal(
            <Modal openModal={modalText === "checkout"} onClose={modalText === "checkout" ? closeModal : null}>
                <form ref={formRef} onSubmit={handleOrder}>
                    <Input label={"Name"} id={"name"} name={"name"} />
                    <Input type="email" label="E-Mail" id="email" name="email" />
                    <Input label="Street" id="street" name="street" />
                    <div className={styles["item-address"]}>
                        <Input type="text" label={"City"} id={"city"} name={"city"} />
                        <Input type="number" label={"Postal Code"} id={"postal-code"} name={"postal-code"} />
                    </div>
                    <div className={styles["item-actions"]}>
                        <button disabled={isFetching} onClick={() => closeModal()} type="button">CLOSE</button>
                        <button disabled={isFetching} type="submit"> ORDER </button>
                    </div>
                </form>
            </Modal>,
            document.getElementById("modal"))
    )

}