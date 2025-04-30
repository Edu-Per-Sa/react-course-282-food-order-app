import { createContext, useState } from "react";

export const ModalContext = createContext({
    modalText: "",
    showModal: (newModalText) => {},
    closeModal: () => {},
});


export default function ModalContextProvider ({ children }) {

    const [modal, setModal] = useState("");

    function showModal(newModalText) {
        setModal(newModalText);
    }

    function closeModal() {
        setModal("");
    }

    const modalContext = {
        modalText: modal,
        showModal,
        closeModal,
    }

    return (
        <ModalContext.Provider value={modalContext}>
            { children }
        </ModalContext.Provider>
    )
}



