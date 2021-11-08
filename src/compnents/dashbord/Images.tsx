import styles from "../dashbord/DashBoard.module.scss"
import { useState, useRef, useEffect, useCallback } from "react";
import React from "react";
import InputNumber from "rc-input-number";
interface props{
    img1ERef: React.RefObject<HTMLImageElement>
    setImage1Size:()=>void
    image1 :string
    img1opacity:number
    img1leftmarg:number
    img1topmarg:number
    img1Width:number
    img1Height:number

    img2ERef: React.RefObject<HTMLImageElement>
    setImage2Size:()=>void
    image2 :string
    img2opacity:number
    img2leftmarg:number
    img2topmarg:number
    img2Width:number
    img2Height:number

    aboveImage:boolean
    backgoundColor:string

}
export default function Images({img1ERef , setImage1Size , image1 , img1opacity , img1leftmarg , img1topmarg , aboveImage , img1Width , img1Height
    ,img2ERef , setImage2Size , image2 , img2opacity , img2leftmarg , img2topmarg  , img2Width , img2Height , backgoundColor}  :props) {
    return (
        <div className={styles.imagesContainer}>
            <div className={styles.parent} style={{ backgroundColor: backgoundColor }}>
                <img data-cy="img1" ref={img1ERef} onLoad={setImage1Size} src={image1} style={{ opacity: img1opacity, marginLeft: img1leftmarg, marginTop: img1topmarg, zIndex: aboveImage ? 10 : 5, width: img1Width ? img1Width : "auto", height: img1Height ? img1Height : "auto" }} className={styles.image1} />
                <img id="img2" ref={img2ERef} onLoad={setImage2Size} src={image2} style={{ opacity: img2opacity, marginLeft: img2leftmarg, marginTop: img2topmarg, zIndex: aboveImage ? 5 : 10, width: img2Width ? img2Width : "auto", height: img2Height ? img2Height : "auto" }} className={styles.image2} />
            </div>
        </div>
    )
}