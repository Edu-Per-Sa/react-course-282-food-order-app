import styles from "./Button.module.css";

export default function Button ({children, className = "", onlyText, type = "button", ...props}) {

    let cssStyle = `${styles["button-container"]}`

    if (onlyText) {
        cssStyle = `${styles["onlyText"]}`;
    }

    if (className) {
        cssStyle += ` ${className}`; 
    }

    return (
        <button className={cssStyle} type={type} {...props}>
            {children}
        </button>
    )
}