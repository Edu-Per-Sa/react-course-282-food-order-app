import styles from "./Header.module.css";
import logo from '../../assets/logo.jpg'

export default function Header() {

    return (
        <header className={styles["header-container"]}>
            <p className={styles["app-info"]}>
                <img src={logo} alt="Logo Food App" />
                <h1> FOOD APP </h1>
            </p>
            <p>
                CART (#?)
            </p>
        </header>
    )
}