import { useEffect, useState } from "react";
import styles from "./Meals.module.css";

import Meal from "../Meal/Meal";
import useHttp from "../../hooks/Http/useHttp";

export default function Meals() {

  // const [meals, setMeals] = useState([]);
  const { isFetching, data: meals, sendRequest, error } = useHttp([]);

  useEffect(() => {
    sendRequest("http://localhost:3000/meals");
  }, [])


  let mealsInfo = <p> Valor por defecto mientras busca menus... </p>

  if (isFetching) {
    mealsInfo = <p> Buscando los menus en la base de datos... </p>
  }

  if (error) {
    console.log("Error--> ", error);
    mealsInfo = <p> ERROR al buscar los menus... {error} </p>
  }

  if (!error && !isFetching && meals.length > 0) {
    mealsInfo = meals.map(meal => <Meal key={meal.id} meal={meal} />);
  }


  return (
    <main className={styles["meals-container"]}>
      {mealsInfo}
    </main>
  )

}