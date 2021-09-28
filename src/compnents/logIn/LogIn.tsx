import React, { useState, useRef } from "react";
import styles from "../logIn/LogIn.module.css"
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"


export default function LogIn() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const history = useHistory()

    const [error, setError] = useState(false);
    const { login } = useAuth()

    async function handlSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(false);
        try {
            await login(emailRef.current ? emailRef.current.value : "", passRef.current ? passRef.current.value : "")
            console.log("ok")
            history.push("dashboard")
        }
        catch {
            console.log("no")
            setError(true);
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardTitle}>
                    <h1>Log In</h1>
                </div>
                <div className={styles.cardContent}>
                    <form onSubmit={handlSubmit} className={styles.form}>
                        <label htmlFor="InputEmail" >Enter Your Email</label>
                        <input type="text" id="InputEmail" ref={emailRef} required />

                        <label htmlFor="InputPass">Enter Your Pass</label>
                        <input type="password" name="" id="InputPass" ref={passRef} required />

                        <button type="submit">Log In</button>
                    </form>
                    <div><label htmlFor="" >{error ? "LogIn Failed" : ""}</label></div>

                </div>

                <div className={styles.cardTail}>if you dont have acount <Link to="/signup">Click</Link></div>
            </div>
        </div>
    )
}