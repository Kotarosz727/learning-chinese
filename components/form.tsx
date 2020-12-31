import React from "react";
import styles from "./fom.module.css";

export default function Form({ children, title }) {
    return (
        <>
            <div className={styles.formContainer}>
                <div className={styles.Form}>
                    <div><h2>{title}</h2></div>
                    {children}
                </div>
            </div>
        </>
    );
}
