import React, { useEffect, useState } from "react";
import { auth, db, firebaseAnalytics } from "../../firebase";
import styles from "../signup/signup.module.scss"
import { Link } from "react-router-dom"
import '../../style/theme.scss';
import "../signup/signup.module.scss"
import { ThemeProvider, useTheme } from "../../context/ThemeProvider";
import Switch from "react-switch";
import { useAuth } from "../../context/AuthProvider";
import { useFormik } from "formik";
import * as yup from "yup"

function SignUp() {

    useEffect(()=>{
        firebaseAnalytics.logEvent("Signup_visited")
    },[])
   
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)


    const { signup } = useAuth()

    const { Theme, ChangeTheme } = useTheme();


    async function handlSubmit(values: any) {
        setError(false);
        try {
            setLoading(true)
            await signup(values.email, values.pass)
            console.log("ok")
            firebaseAnalytics.logEvent("signup" )
            const id =auth.currentUser?.uid;
            await db.collection('Users').add({
                UserName: values.userName,
                id,
            })
        }
        catch {
            console.log("no")
            setError(true);
        }
        setLoading(false)
    }

    function ChangeThemeCompnent() {
        return (
            <div>

                <Switch onChange={ChangeTheme} checked={Theme == 'light' ? true : false}></Switch> Light theme
            </div>
        )
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            userName:'',
            pass: '',
            confirmPass: ''

        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email address').required('Required'),
            userName:yup.string().max(10,'User name too long').required('Required'),
            pass: yup.string().min(4, 'Pass is too short').required('Required'),
            confirmPass: yup.string().min(4, 'Pass is too short').required('Required').oneOf([yup.ref('pass'), null], "password dosnt mach")
        }),
        onSubmit: values => {
            handlSubmit(values)
        },
    });


    return (

        <div className={`container ${Theme}`}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <h1>Sign Up</h1>
                        <ChangeThemeCompnent />
                        <hr />
                    </div>
                    <div className={styles.cardContent} data-cy="/signupCard">
                        <form onSubmit={formik.handleSubmit} className={styles.form}>
                        <label htmlFor="userName">User Name</label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName}
                            />
                            {formik.touched.userName && formik.errors.userName ? (
                                <div>{formik.errors.userName}</div>
                            ) : null}

                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}


                            <label htmlFor="pass">Password</label>
                            <input
                                id="pass"
                                name="pass"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.pass}
                            />
                            {formik.touched.pass && formik.errors.pass ? (
                                <div>{formik.errors.pass}</div>
                            ) : null}

                            <label htmlFor="confirmPass">Password</label>
                            <input
                                id="confirmPass"
                                name="confirmPass"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPass}
                            />
                            {formik.touched.confirmPass && formik.errors.confirmPass ? (
                                <div>{formik.errors.confirmPass}</div>
                            ) : null}

                            <button type="submit" disabled={loading}>Submit</button>
                        </form>
                        <div><label htmlFor="" >{error ? "Signup Failed" : ""}</label></div>

                        {/* <form onSubmit={handlSubmit} className={styles.form}>
                        <label htmlFor="InputEmail" >Enter Your Email</label>
                        <input type="text" id="InputEmail" ref={emailRef} required />

                        <label htmlFor="InputPass">Enter Your Pass</label>
                        <input type="password" name="" id="InputPass" ref={passRef} required />

                        <label htmlFor="InputPassConfirm">Enter Your Pass Again</label>
                        <input type="text" id="InputPassConfirm " ref={passConfirmRef} required />
                        <button type="submit" disabled={loading}>Sign Up</button>
                    </form>
                    <div><label htmlFor="" >{error ? "Signup Failed" : ""}</label></div> */}

                    </div>
                    <div className={styles.cardTail}>
                        if you have acount <Link data-cy="/login" to="/login">Click</Link>

                    </div>
                </div>
            </div>
        </div>

    )

}

export default SignUp;
export { }