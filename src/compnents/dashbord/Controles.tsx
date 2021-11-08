import styles from "../dashbord/DashBoard.module.scss"
import { useState, useRef, useEffect, useCallback } from "react";
import React from "react";
import InputNumber from "rc-input-number";

interface myImageConrolesProps {
    handleImgopacity: (opcity: number) => void;
    handleImgopacityBlure: () => void
    refImgopacity: React.RefObject<HTMLInputElement>

    handleImgleftmarg: (event: any) => void
    handleImgleftmargBlur: (event: any) => void
    handleImgtopmarg: (event: any) => void
    handleImgtopmargBlur: (event: any) => void

    imgHeight:number
    handleImgHeigth:(event:any) =>void
    handleImgHeigthBlur:(event :any) => void

    imgWidth:number
    handleImgWidth:(event:any) =>void
    handleImgWidthBlur:(event :any) => void

    name:String
}


export function ImageControles({name, handleImgopacity, handleImgopacityBlure, refImgopacity, handleImgleftmarg, handleImgleftmargBlur, handleImgtopmarg, handleImgtopmargBlur 
,imgHeight , handleImgHeigthBlur , handleImgHeigth , imgWidth , handleImgWidthBlur , handleImgWidth}: myImageConrolesProps) {
    function handle() {
        handleImgopacity(refImgopacity.current ? parseInt(refImgopacity.current.value) / 10 : 0)
    }
    return (
        <div>
            <p>opcity of image</p>
            <input data-testid={"Opcity "+name} type="range" defaultValue={10} min={0} max={10} onInput={handle} ref={refImgopacity} onBlur={handleImgopacityBlure} />

            <p>left margin of {name}</p>
            <InputNumber data-testid={"Left Margin "+name} defaultValue={5} onChange={handleImgleftmarg} className={styles.InputNumber} onBlur={handleImgleftmargBlur}></InputNumber>

            <p>top margin of {name}</p>
            <InputNumber data-testid={"Top Margin  "+name} defaultValue={5} onChange={handleImgtopmarg} className={styles.InputNumber} onBlur={handleImgtopmargBlur}></InputNumber>

            <p>height of {name}</p>
            <InputNumber data-testid={"Height "+name} value={imgHeight} onChange={handleImgHeigth} className={styles.InputNumber} onBlur={handleImgHeigthBlur}></InputNumber>

            <p>width  of {name}</p>
            <InputNumber data-testid={"Width "+name} value={imgWidth} onChange={handleImgWidth} className={styles.InputNumber} onBlur={handleImgWidthBlur}></InputNumber>

        </div>
    )
}
