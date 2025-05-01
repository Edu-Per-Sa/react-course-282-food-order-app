import { useEffect, useState } from "react";
import styles from "./Meals.module.css";

import Meal from "../Meal/Meal";
import useHttp from "../../hooks/Http/useHttp";
import ErrorInfo from "../ErrorInfo/ErrorInfo.jsx";

export default function Meals() {

  const { isFetching, data: meals, sendRequest, error } = useHttp([]);

  useEffect(() => {
    sendRequest("http://localhost:3000/meals");
  }, [])


  let mealsInfo = <p> Esperando la busqueda de los menus... </p>

  if (isFetching) {
    mealsInfo = <p> Buscando los menus en la base de datos... </p>
  }

  if (error) {
    mealsInfo = <ErrorInfo title={"Error fetching menus..."} message={error}/>
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