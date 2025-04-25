import { useContext } from "react";
import { CartContext } from "../../store/cart-context.jsx";

import styles from "./Header.module.css";
import logo from '../../assets/logo.jpg';


export default function Header() {

    const { cart } = useContext(CartContext);

    return (
        <header className={styles["header-container"]}>
            <div className={styles["app-info"]}>
                <img src={logo} alt="Logo Food App" />
                <h1> FOOD APP </h1>
            </div>
            <div>
                CART ( {cart.items.length} )
            </div>
        </header>
    )
}