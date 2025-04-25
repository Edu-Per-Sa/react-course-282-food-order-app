import { useContext } from "react";
import Button from "../../UI/Button/Button";
import styles from "./Meal.module.css";
import { CartContext } from "../../store/cart-context.jsx";

export default function Meal({ meal }) {

    const { addItem } = useContext(CartContext);

    function formattingPrice (price) {
        return Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
    };

    function handleAddItem (meal) {
        addItem(meal);
    };

    return (
        <div className={styles["meal-container"]}>
            <img className={styles["meal-imagen"]} src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <h3 className={styles["meal-name"]}> {meal.name} </h3>
            <p className={styles["meal-price"]}> {formattingPrice(meal.price)} </p>
            <p className={styles["meal-description"]}> {meal.description} </p>
            <Button onClick={() => handleAddItem(meal)}> Add to cart </Button>
        </div>
    )
}