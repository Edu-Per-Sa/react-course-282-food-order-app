import { useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Checkout.module.css";

import { ModalContext } from "../../store/modal-context";
import { CartContext } from "../../store/cart-context.jsx";
import Modal from "../../UI/Modal/Modal.jsx";
import Input from "../../UI/Input/Input.jsx";
import useHttp from "../../hooks/Http/useHttp.js";
import ErrorInfo from "../ErrorInfo/ErrorInfo.jsx";
import Button from "../../UI/Button/Button.jsx"

export default function Checkout() {

    const { modalText, closeModal } = useContext(ModalContext);
    const { cart, clearCart } = useContext(CartContext);

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
    }


    let actionsInfo = <>
        <button onClick={() => closeModal()} type="button">CLOSE</button>
        <button type="submit"> ORDER </button>
    </>
    if (isFetching) {
        actionsInfo = <p> Sending order...</p>
    }

    let errorInfo = ""
    if (error) {
        errorInfo = <ErrorInfo title={"Error sending order"} message={error.message} />
    }

    let infoModal = <form ref={formRef} onSubmit={handleOrder}>
        <Input label={"Name"} id={"name"} name={"name"} />
        <Input type="email" label="E-Mail" id="email" name="email" />
        <Input label="Street" id="street" name="street" />
        <div className={styles["item-address"]}>
            <Input type="text" label={"City"} id={"city"} name={"city"} />
            <Input type="number" label={"Postal Code"} id={"postal-code"} name={"postal-code"} />
        </div>
        {errorInfo}
        <div className={styles["item-actions"]}>
            {actionsInfo}
        </div>
    </form>

    if (!error && respData.message) {

        formRef.current.reset();
        
        clearCart();

        infoModal = <>
            <h2> Successful... </h2>
            <p> {respData.message}</p>
            <Button onClick={closeModal}> Ok </Button>
        </>
    }

    return (
        createPortal(
            <Modal openModal={modalText === "checkout"} onClose={modalText === "checkout" ? closeModal : null}>
                {infoModal}
            </Modal>,
            document.getElementById("modal"))
    )

}