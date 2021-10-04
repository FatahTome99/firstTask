import React, { useState, useRef, Suspense } from "react";
import styles from "../logIn/LogIn.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { ThemeProvider, useTheme } from "../../context/ThemeProvider";
// import i18next from 'i18next';
import { useTranslation } from "react-i18next";
import '../logIn/LogIn.module.scss'
import '../../style/theme.scss';
import Switch from "react-switch";
import {useFormik } from 'formik';
import * as yup from "yup"

import ns from '../../translations/en/common.json';



export default function LogIn() {

    const { Theme, ChangeTheme } = useTheme();


    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const history = useHistory()

    const [error, setError] = useState(false);
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)

    const [LeftAlign, setLeftAlign] = useState(true);

    async function handlSubmit(values :any) {
        // event.preventDefault();
        
        setError(false);
        try {
            setLoading(true)
            await login(values.email,values.pass)
            console.log("ok")
            history.push("dashboard")
        }
        catch {
            console.log("no")
            setError(true);
        }
        setLoading(false)
    }

    const [t, i18n] = useTranslation("common");

    function changeLanguageToAr() {
        console.log("ar")
        i18n.changeLanguage('ar')
        setLeftAlign(false)

    }
    function changeLanguageToEn() {
        i18n.changeLanguage('en')
        setLeftAlign(true)

    }

    function Changelanguage() {
        return (
            <div>
                <button onClick={changeLanguageToAr} className={styles.langugeButton}>العربية</button>
                <button onClick={changeLanguageToEn} className={styles.langugeButton}>English</button>
            </div>
        )
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
            pass: ''
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email address').required('Required'),
            pass: yup.string().min(4, 'Pass is too short').required('Required')
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
                            <Changelanguage />
                            <ChangeThemeCompnent />
                            <h1>{t('LogIn.title')}</h1>
                            <hr />
                        </div>

                        <div className={styles.cardContent}>

                            <form onSubmit={formik.handleSubmit} className={styles.form}>
                                <label htmlFor="email" style={{ textAlign:LeftAlign?'left':'right'}}>{t('LogIn.Form.EmailLabel')}</label>
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

                                <label htmlFor="pass" style={{ textAlign:LeftAlign?'left':'right'}}>{t('LogIn.Form.PassLabel')}</label>
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

                                <button type="submit">{t('LogIn.title')}</button>
                            </form>
                            <div><label htmlFor="" >{error ? t("LogIn.Form.Failed") : ""}</label></div>
                            
                            {/* <form onSubmit={handlSubmit} className={styles.form}>
                        <label htmlFor="InputEmail" style={{ textAlign:LeftAlign?'left':'right'}}>{t('LogIn.Form.EmailLabel')}</label>
                        <input type="text" id="InputEmail" ref={emailRef} required />

                        <label htmlFor="InputPass" style={{ textAlign:LeftAlign?'left':'right'}}>{t('LogIn.Form.PassLabel')}</label>
                        <input type="password" name="" id="InputPass" ref={passRef} required />

                        <button type="submit">{t('LogIn.title')}</button>
                    </form>
                    <div><label htmlFor="" >{error ? "LogIn Failed" : ""}</label></div> */}


                        </div>

                        <div className={styles.cardTail}>{t('LogIn.Form.Signup')}<Link to="/signup">{t('LogIn.Form.click')}</Link></div>
                    </div>
                </div>
            </div>
    )
}