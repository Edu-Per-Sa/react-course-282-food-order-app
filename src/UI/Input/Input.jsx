import styles from "./Input.module.css";

export default function Input({ type = "text", label, id, name, ...props }) {

    return (
        <div className={styles["input-container"]}>
            <label htmlFor={id}> {label} </label>
            <input type={type} id={id} name={name} required {...props}/>
        </div>
    )
}