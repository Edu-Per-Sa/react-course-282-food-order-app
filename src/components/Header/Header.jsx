import { useContext } from "react";
import { CartContext } from "../../store/cart-context.jsx";
import { formattingPrice } from "../../util/fotmattingPrice.js";
import styles from "./Header.module.css";
import logo from '../../assets/logo.jpg';
import Button from "../../UI/Button/Button.jsx";
import { ModalContext } from "../../store/modal-context.jsx";


export default function Header() {

    const { items } = useContext(CartContext);
    const { showModal } = useContext(ModalContext);

    
    const totalItems = items.length > 0  ? items.reduce((totalItems, item) => {return totalItems + item.quantity}, 0) : 0;

    return (
        <header className={styles["header-container"]}>
            <div className={styles["app-info"]}>
                <img src={logo} alt="Logo Food App" />
                <h1> FOOD APP </h1>
            </div>
            <div>
                <Button onClick={() => showModal("cart")}>
                    CART ( {totalItems} )
                </Button>
            </div>
        </header>
    )
}