import styles from "./EmptyInfo.module.css";

export default function EmptyInfo ({children}) {

    return (
        <div className={styles["container"]}>
            {children}
        </div>
    )
}