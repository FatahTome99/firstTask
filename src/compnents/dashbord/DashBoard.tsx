import React, { useState, useRef, HtmlHTMLAttributes, useEffect, useLayoutEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useHistory } from "react-router";
import styles from "../dashbord/DashBoard.module.css"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
// import RangeSlider from 'react-bootstrap-range-slider';
import InputNumber from 'rc-input-number';
import { ChromePicker, Color } from 'react-color';
import ReactColorPicker from '@super-effective/react-color-picker';

export default function DashBoard() {
    const { logout } = useAuth()
    const history = useHistory();

    const [img1opacity, setImg1opacity] = useState(1);
    const [img2opacity, setImg2opacity] = useState(1);
    const [img1leftmarg, setImg1leftmarg] = useState(5);
    const [img2leftmarg, setImg2leftmarg] = useState(5);
    const [img1topmarg, setImg1topmarg] = useState(5);
    const [img2topmarg, setImg2topmarg] = useState(5);

    const [img1Height ,setImg1Height] = useState(0);
    const [img1Width ,setImg1Width] = useState(0);
    const [img2Height ,setImg2Height] = useState(0);
    const [img2Width ,setImg2Width] = useState(0);

    const [backgoundColor, setBackgroundColor] = useState("#ffff")
    const [aboveImage , setAboveImage] =useState(false)

    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");

    //console.log("ddsd  "+img1.length)

    const refImg1opacity = useRef<HTMLInputElement>(null);
    const refImg2opacity = useRef<HTMLInputElement>(null);
    const img1ERef = useRef<HTMLImageElement>(null);
    const img2ERef = useRef<HTMLImageElement>(null);

    const refAbove = useRef<HTMLInputElement>(null);


    const refUpload1 = useRef(null);
    const refUpload2 = useRef(null);

    // const [img1 , setImg1] =useState("");

    function handleImg1opacity() {
        setImg1opacity(refImg1opacity.current ? parseInt(refImg1opacity.current.value) / 10 : 0)
    }
    function handleImg2opacity() {
        setImg2opacity(refImg2opacity.current ? parseInt(refImg2opacity.current.value) / 10 : 0)
    }

    function handleImg1leftmarg(event :any) {
        setImg1leftmarg(event)
    }

    function handleImg2leftmarg(event :any) {
        setImg2leftmarg(event)
    }

    function handleImg1topmarg(event :any) {
        setImg1topmarg(event)
    }

    function handleImg2topmarg(event :any) {
        setImg2topmarg(event)
    }

    function handleImg1Heigth(event :any) {
        setImg1Height(event)
    }
    function handleImg1Width(event :any) {
        setImg1Width(event)
    }

    function handleImg2Heigth(event :any) {
        setImg2Height(event)
    }
    function handleImg2Width(event :any) {
        setImg2Width(event)
    }

   

    
    function handleLogout() {
        logout();
        history.push("/login")
    }
 
    // function handleImg1() {
    //     setImage1(refUpload1.current? refUpload1.current : "")
    //     // setImge1(URL.createObjectURL(refUpload1.current? refUpload1.current.value : ""))
    //     console.log(refBackgroundColor.current + "hhhhh")
    // }

    function onColorChange(updatedColor: string) {
        setBackgroundColor(updatedColor);
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
        setImage1(event.target ? URL.createObjectURL(event.target.files[0]) : "");
        setImage1Size();
        console.log("TEST", image1)
        
    };
    const handleImg2 = (event: any) => {
        setImage2(event.target ? URL.createObjectURL(event.target.files[0]) : "");
        setImage2Size();
    };

    function handleAbove(event : any){
       setAboveImage(refAbove.current?refAbove.current.checked : false)
    }

    return (
        <div className={styles.Container}>
            <div className={styles.header}>
                <h1>First Task </h1>
                <div style={{display:"flex" , flexDirection:"row"}}>
                <div>Chose image1<input type="file" onChange={handleImg1} /></div>
                <div>chose image2<input type="file" onChange={handleImg2} ref={refUpload2} /></div>
                <button onClick ={handleLogout}>Logout</button>
                </div>
                

            </div>
            <div className={styles.mainContainer}>

                <div className={styles.imagesContainer}>
                    <div className={styles.parent} style={{ backgroundColor: backgoundColor }}>
                        <img id="img1" ref={img1ERef} onLoad={setImage1Size} src={image1} style={{ opacity: img1opacity, marginLeft: img1leftmarg, marginTop: img1topmarg ,zIndex:aboveImage?10:5 , width:img1Width?img1Width : "auto" , height:img1Height?img1Height : "auto" }} className={styles.image1} />
                        <img id="img2" ref={img2ERef} onLoad={setImage2Size} src={image2} style={{ opacity: img2opacity, marginLeft: img2leftmarg, marginTop: img2topmarg , zIndex:aboveImage?5:10 , width:img2Width ? img2Width: "auto" , height:img2Height?img2Height:"auto" }} className={styles.image2} />
                    </div>
                </div>

                <div className={styles.controlContainer}>
                    <div><label htmlFor="t">Image1 above Image2 
                    <input type="checkbox" id="above" ref={refAbove} onChange={handleAbove} />
                    </label></div>
                    
                    
                    <p>opcity of image1</p>
                    <input id="s1" type="range" defaultValue={10} min={0} max={10} onInput={handleImg1opacity} ref={refImg1opacity} />
                    <p>opcity of image2</p>
                    <input id="s2" type="range" defaultValue={10} min={0} max={10} onInput={handleImg2opacity} ref={refImg2opacity} />

                    <p>left margin of image1</p>
                    <InputNumber defaultValue={5} onChange={handleImg1leftmarg} className={styles.InputNumber} ></InputNumber>

                    <p>left margin of image2</p>
                    <InputNumber defaultValue={5} onChange={handleImg2leftmarg} className={styles.InputNumber} ></InputNumber>

                    <p>top margin of image1</p>
                    <InputNumber defaultValue={5} onChange={handleImg1topmarg}  className={styles.InputNumber} ></InputNumber>

                    <p>top margin of image2</p>
                    <InputNumber defaultValue={5} onChange={handleImg2topmarg}  className={styles.InputNumber} ></InputNumber>

                    <p>backgoundColor</p>
                    <ReactColorPicker onChange={onColorChange} />

                    <p>height of image1</p>
                    <InputNumber value={img1Height} onChange={handleImg1Heigth}  className={styles.InputNumber} ></InputNumber>

                    <p>width  of image1</p>
                    <InputNumber value={img1Width} onChange={handleImg1Width}  className={styles.InputNumber} ></InputNumber>

                    <p>height of image2</p>
                    <InputNumber value={img2Height} onChange={handleImg2Heigth}  className={styles.InputNumber} ></InputNumber>

                    <p>width  of image2</p>
                    <InputNumber value={img2Width} onChange={handleImg2Width}  className={styles.InputNumber} ></InputNumber>

                </div>

            </div>

            {/* <div>
                <button onClick={handle}>Logout</button>
            </div> */}
        </div>

    )
}