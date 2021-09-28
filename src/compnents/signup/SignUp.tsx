import React, { useState } from "react";
import { auth } from "../../firebase";
import styles from "../signup/signup.module.css"
import { Link } from "react-router-dom"


function SignUp() {
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passRef = React.useRef<HTMLInputElement>(null);
    const passConfirmRef = React.useRef<HTMLInputElement>(null);

    const [error, setError] = useState(false);


    function isPssEquel(pass: string, passConfirm: string) {
        return pass == passConfirm
    }

    function handlSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(emailRef.current ? emailRef.current.value : "", passRef.current ? passRef.current.value : "")
        console.log(emailRef.current?.value)


    }


    return (

        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardTitle}>
                    <h1>Sign Up</h1>
                </div>
                <div className={styles.cardContent}>
                    <form onSubmit={handlSubmit} className={styles.form}>
                        <label htmlFor="InputEmail" >Enter Your Email</label>
                        <input type="text" id="InputEmail" ref={emailRef} required />

                        <label htmlFor="InputPass">Enter Your Pass</label>
                        <input type="password" name="" id="InputPass" ref={passRef} required />

                        <label htmlFor="InputPassConfirm">Enter Your Pass Again</label>
                        <input type="text" id="InputPassConfirm " ref={passConfirmRef} required />
                        <button type="submit">Sign Up</button>
                    </form>
                    <div><label htmlFor="" >{error ? "LogIn Failed" : ""}</label></div>

                </div>
                <div className={styles.cardTail}>
                    if you have acount <Link to="/login">Click</Link>

                </div>
            </div>
        </div>

    )

}

export default SignUp;
export { }