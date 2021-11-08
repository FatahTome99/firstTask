import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useHistory } from "react-router";
import styles from "../dashbord/DashBoard.module.scss"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
// import RangeSlider from 'react-bootstrap-range-slider';
import InputNumber from 'rc-input-number';
import ReactColorPicker from '@super-effective/react-color-picker';
import { ThemeProvider, useTheme } from "../../context/ThemeProvider";
import Switch from "react-switch";
import '../../style/theme.scss';
import "../dashbord/DashBoard.module.scss"
import { firebaseAnalytics } from "../../firebase";
import _ from "lodash";
import Messages from '../../compnents/messages/Messages';
import { ImageControles } from "./Controles";

import Images from "./Images"
export default function DashBoard() {
    useEffect(() => {
        firebaseAnalytics.logEvent("DashBoard_visited")
    }, [])

    const { logout } = useAuth()
    const history = useHistory();

    const { Theme, ChangeTheme } = useTheme();

    const [img1opacity, setImg1opacity] = useState(1);
    const [img2opacity, setImg2opacity] = useState(1);
    const [img1leftmarg, setImg1leftmarg] = useState(5);
    const [img2leftmarg, setImg2leftmarg] = useState(5);
    const [img1topmarg, setImg1topmarg] = useState(5);
    const [img2topmarg, setImg2topmarg] = useState(5);

    const [img1Height, setImg1Height] = useState(0);
    const [img1Width, setImg1Width] = useState(0);
    const [img2Height, setImg2Height] = useState(0);
    const [img2Width, setImg2Width] = useState(0);

    const [backgoundColor, setBackgroundColor] = useState("#ffff")
    const [aboveImage, setAboveImage] = useState(false)

    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");

    //console.log("ddsd  "+img1.length)

    const refImg1opacity = useRef<HTMLInputElement>(null);
    const refImg2opacity = useRef<HTMLInputElement>(null);
    const img1ERef = useRef<HTMLImageElement>(null);
    const img2ERef = useRef<HTMLImageElement>(null);

    const refAbove = useRef<HTMLInputElement>(null);

    const [showChat, setShowchat] = useState(false)


    const refUpload1 = useRef(null);
    const refUpload2 = useRef(null);

    function ChangeThemeCompnent() {
        return (
            <div>
                {/* <button onClick={ ChangeTheme} className={styles.buttonLight}>light</button>
                <button onClick={ ChangeTheme } className={styles.buttonDark}>dark</button> */}
                <Switch onChange={ChangeTheme} checked={Theme == 'light' ? true : false}></Switch> Light theme
            </div>
        )
    }

    // const [img1 , setImg1] =useState("");

    function handleImg1opacity(opcity: number) {
        // const opcity = refImg1opacity.current ? parseInt(refImg1opacity.current.value) / 10 : 0
        setImg1opacity(opcity)
        console.log("opc1 change   " + opcity)
        //firebaseAnalytics.logEvent("change_img1_opcity" , {'opcity' :opcity})
    }

    function handleImg1opacityBlure() {
        const opcity = refImg1opacity.current ? parseInt(refImg1opacity.current.value) / 10 : 0
        //setImg1opacity(opcity)
        firebaseAnalytics.logEvent("change_img1_opcity", { 'opcity': opcity })
    }
    function handleImg2opacity() {
        const opcity = refImg2opacity.current ? parseInt(refImg2opacity.current.value) / 10 : 0
        setImg2opacity(opcity)

    }
    function handleImg2opacityBlure() {
        const opcity = refImg2opacity.current ? parseInt(refImg2opacity.current.value) / 10 : 0
        firebaseAnalytics.logEvent("change_img2_opcity", { 'opcity': opcity })
    }


    function handleImg1leftmarg(event: any) {
        setImg1leftmarg(event)
    }
    function handleImg1leftmargBlur(event: any) {
        firebaseAnalytics.logEvent("change_img1_left_margin", { 'margin': event })
    }

    function handleImg2leftmarg(event: any) {
        setImg2leftmarg(event)
    }
    function handleImg2leftmargBlur(event: any) {
        firebaseAnalytics.logEvent("change_img2_left_margin", { 'margin': event })
    }

    function handleImg1topmarg(event: any) {
        setImg1topmarg(event)
    }
    function handleImg1topmargBlur(event: any) {
        firebaseAnalytics.logEvent("change_img1_top_margin", { 'margin': event })
    }

    function handleImg2topmarg(event: any) {
        setImg2topmarg(event)
    }
    function handleImg2topmargBlur(event: any) {
        firebaseAnalytics.logEvent("change_img2_top_margin", { 'margin': event })
    }

    function handleImg1Heigth(event: any) {
        setImg1Height(event)
    }
    function handleImg1HeigthBlur(event: any) {
        firebaseAnalytics.logEvent("change_img1_height", { 'height': event })
    }

    function handleImg1Width(event: any) {
        setImg1Width(event)
    }
    function handleImg1WidthBlur(event: any) {
        firebaseAnalytics.logEvent("change_img1_width", { 'width': event })
    }

    function handleImg2Heigth(event: any) {
        setImg2Height(event)
    }
    function handleImg2HeigthBlur(event: any) {
        firebaseAnalytics.logEvent("change_img2_height", { 'height': event })
    }

    function handleImg2Width(event: any) {
        setImg2Width(event)
    }
    function handleImg2WidthBlur(event: any) {
        firebaseAnalytics.logEvent("change_img2_width", { 'width': event })
    }


    const delayedChange = useCallback(_.debounce(q => onColorBlur(q), 500), []);

    function onColorChange(updatedColor: string) {
        setBackgroundColor(updatedColor);
        delayedChange(updatedColor);

    };

    function onColorBlur(updatedColor: string) {
        console.log("hi oncolor")
        firebaseAnalytics.logEvent("change_backgroind_color", { 'color': updatedColor })

    };

    function setImage1Size() {
        // var img = document.getElementById('img1'); 
        if (img1ERef.current !== null) {
            console.log(img1ERef.current.clientHeight)
            console.log(img1ERef.current.clientWidth)

            setImg1Height(img1ERef.current.clientHeight);
            setImg1Width(img1ERef.current.clientWidth);
        }
        console.log(img1ERef)
    }

    function setImage2Size() {
        // var img = document.getElementById('img1'); 
        if (img2ERef.current !== null) {
            setImg2Height(img2ERef.current.clientHeight);
            setImg2Width(img2ERef.current.clientWidth);
        }
    }

    const handleImg1 = (event: any) => {
        const url = event.target ? URL.createObjectURL(event.target.files[0]) : ""
        setImage1(url);
        setImage1Size();
        console.log("TEST  url  ",url)
        firebaseAnalytics.logEvent("uploade_img1", { 'img': url })

    };
    const handleImg2 = (event: any) => {
        const url = event.target ? URL.createObjectURL(event.target.files[0]) : ""
        setImage2(url);
        setImage2Size();
        firebaseAnalytics.logEvent("uploade_img2", { 'img': url })
    };

    function handleAbove(event: any) {
        setAboveImage(refAbove.current ? refAbove.current.checked : false)
        firebaseAnalytics.logEvent("change_above_img", { 'img': aboveImage ? 'img1' : 'img2' })
    }

    function handleLogout() {
        logout();
        history.push("/login")
        firebaseAnalytics.logEvent("logout")
    }

    function handleShowChat() {
        // history.push("/chat")
        setShowchat(true)
    }
    
    return (
        <div className={`container ${Theme}`} style={{ position: 'absolute', width:"100%" , height:"100vh"}}>
            <div className={styles.header}>
                <h1>First Task </h1>
                <div style={{ display: "flex", flexDirection: "row" , justifyContent:" space-between"}}>
                    <div>Chose image1<input data-cy ="uploade img1"  type="file" accept=".png,.jpg" onChange={handleImg1} /></div>
                    <div>chose image2<input type="file" onChange={handleImg2} accept=".png,.jpg" ref={refUpload2} /></div>
                    <ChangeThemeCompnent />
                    <button onClick={handleLogout}>Logout</button>
                </div>

            </div>
            <div className={styles.mainContainer}>


                <Images img1ERef={img1ERef} setImage1Size={setImage1Size} image1={image1} img1opacity={img1opacity} img1leftmarg={img1leftmarg} img1topmarg={img1topmarg} aboveImage={aboveImage} img1Width={img1Width} img1Height={img1Height}
                    img2ERef={img2ERef} setImage2Size={setImage2Size} image2={image2} img2opacity={img2opacity} img2leftmarg={img2leftmarg} img2topmarg={img2topmarg} img2Width={img2Width} img2Height={img2Height} backgoundColor={backgoundColor}></Images>

                <div className={styles.controlContainer}>

                    <ImageControles name={"Image 1"} handleImgopacity={handleImg1opacity} refImgopacity={refImg1opacity} handleImgopacityBlure={handleImg1opacityBlure}
                        handleImgleftmarg={handleImg1leftmarg} handleImgleftmargBlur={handleImg1leftmargBlur}
                        handleImgtopmarg={handleImg1topmarg} handleImgtopmargBlur={handleImg1topmargBlur}
                        imgHeight={img1Height} handleImgHeigth={handleImg1Heigth} handleImgHeigthBlur={handleImg1HeigthBlur}
                        imgWidth={img1Width} handleImgWidth={handleImg1Width} handleImgWidthBlur={handleImg1WidthBlur}
                    />

                    <ImageControles name={"Image 2"} handleImgopacity={handleImg2opacity} refImgopacity={refImg2opacity} handleImgopacityBlure={handleImg2opacityBlure}
                        handleImgleftmarg={handleImg2leftmarg} handleImgleftmargBlur={handleImg2leftmargBlur}
                        handleImgtopmarg={handleImg2topmarg} handleImgtopmargBlur={handleImg2topmargBlur}
                        imgHeight={img2Height} handleImgHeigth={handleImg2Heigth} handleImgHeigthBlur={handleImg2HeigthBlur}
                        imgWidth={img2Width} handleImgWidth={handleImg2Width} handleImgWidthBlur={handleImg2WidthBlur}
                    />

                    <div>
                        <label htmlFor="t">Image1 above Image2
                            <input type="checkbox" id="above" ref={refAbove} onChange={handleAbove} />
                        </label></div>
                    <p>backgoundColor</p>
                    <ReactColorPicker onChange={onColorChange} />
                </div>

                {showChat ? <Messages setShowChat={setShowchat}></Messages> : null}

            </div>

            {/* <div>
                <button onClick={handle}>Logout</button>
            </div> */}
            <button onClick={handleShowChat} data-cy ="open chat">Chat</button>
        </div>

    )
}