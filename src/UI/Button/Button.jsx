import styles from "./Button.module.css";

export default function Button ({children, className, ...props}) {

    const cssStyle = `${styles["button-container"]} ${className}}`

    return (
        <button className={cssStyle}  {...props}>
            {children}
        </button>
    )
}