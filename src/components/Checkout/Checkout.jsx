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

    const { modalText, closeModal, showModal } = useContext(ModalContext);
    const { items, clearCart } = useContext(CartContext);

    const formRef = useRef();

    const { sendRequest, error, data: respData, isFetching, clearDataRespopnse } = useHttp([]);

    async function handleOrder(event) {
        event.preventDefault();
        const formDataObj = new FormData(event.target);
        const data = Object.fromEntries(formDataObj.entries());

        const resData = await sendRequest(
            "http://localhost:3000/orders",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order: {
                        items,
                        customer: { ...data }
                    }
                })
            }
        );

        if (resData) {
            formRef.current.reset();
        }
    }

    function handleOkOrder () {
        clearDataRespopnse();
        closeModal();
        clearCart();
    }

    let actionsInfo = <>
        <Button onlyText onClick={() => closeModal()}> CLOSE </Button>
        <Button type="submit"> ORDER </Button>
    </>
    if (isFetching) {
        actionsInfo = <p> Sending order...</p>
    }

    let errorInfo = ""
    if (error) {
        errorInfo = <ErrorInfo title={"Error sending order"} message={error.message} />
    }

    let infoModal = <form className={styles["form-container"]} ref={formRef} onSubmit={handleOrder}>
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
        infoModal = <div className={styles["form-container"]}>
            <h2> Successful... </h2>
            <p> {respData.message}</p>
            <Button className={styles["ok-seccessful"]} onClick={handleOkOrder}> Ok </Button>
        </div>
    }

    return (
        createPortal(
            <Modal openModal={modalText === "checkout"} onClose={modalText === "checkout" ? closeModal : null}>
                {infoModal}
            </Modal>,
            document.getElementById("modal"))
    )

}