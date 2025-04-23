import styles from "./Meals.module.css";

import Meal from "../Meal/Meal";
import { useEffect, useState } from "react";

export default function Meals() {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function getMeals() {
      const response = await fetch("http://localhost:3000/meals");
      setMeals(await response.json());
    }
    getMeals()
  }, [])


  return (
    <main className={styles["meals-container"]}>
      {meals.length === 0 && <p> Esperando data...</p>}
      {meals.length > 0 && meals.map(meal =>
        <Meal
          key={meal.id}
          img={`http://localhost:3000/${meal.image}`}
          name={meal.name}
          price={meal.price}
          description={meal.description}
        />)
      }
    </main>
  )

}