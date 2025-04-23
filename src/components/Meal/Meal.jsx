import styles from "./Meal.module.css";

export default function Meal({ img, name, price, description, onClick }) {

    return (
        <div className={styles["meal-container"]}>
            <div className={styles["meal-img"]}>
                <img src={img} alt={name} />
            </div>
            <div className={styles["meal-info"]}>
                <h3> {name} </h3>
                <p> {price} </p>
                <p> {description} </p>
            </div>
            <div className={styles["meal-button"]}>
                <button onClick={onClick}> Add to cart </button>
            </div>
        </div>
    )
}