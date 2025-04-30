import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ openModal, children, className = "", onClose}) {

    const cssStyle = `${styles["modal-container"]} ${className}`

    const modalRef = useRef();

    useEffect(() => {

        const modal = modalRef.current;

        if (openModal) {
            modal.showModal();
        }

        return () => modal.close();
    }, [openModal]);


    return createPortal(
            <dialog ref={modalRef} className={cssStyle} onClose={onClose}>
                {children}
            </dialog>,
            document.getElementById("modal")
        );
    
}