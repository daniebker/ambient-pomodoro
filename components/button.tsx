
import React from 'react'
import styles from './buttons.module.css'

export const Button = (props: any) => {
    return <button
        className={`${styles.btnTransparent} ${styles.btn}`}
        {...props}>
        {props.children}
    </button>
}