import styles from "./Button.module.css";

export default function Button ({children, className, type = "button", ...props}) {

    const cssStyle = `${styles["button-container"]} ${className}}`

    return (
        <button className={cssStyle}  type={type} {...props}>
            {children}
        </button>
    )
}