import React, { useState, useRef } from 'react';
import { NewPresPopupStyle, 
    YesNoBtnStyle, 
    InputForLogReg, 
    CodeInputTextArea } from '../styles/styledComponents';
import { useParams } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import hljs from 'highlight.js';
import Moveable from "react-moveable";
import styled, { createGlobalStyle } from 'styled-components';



const MoveableElement = ({ curSlideRef, editable, targetRef, customStyles, newLocationX, newLocationY, setNewLocationX, setNewLocationY }) => { 

    
    const handleDrag = (e) => {

        const slideWidth = curSlideRef.current.offsetWidth;
        const slideHeight = curSlideRef.current.offsetHeight;
        const result = e.target.style.transform.match(/translate\((-?\d+)px,\s*(-?\d+)px\)/); // /translate\((\d+)px,\s*(\d+)px\)/
        if (result === null) {
            return;
        }
        console.log(curSlideRef)
        console.log(e.target.style.transform)
        console.log(slideWidth)
        console.log(slideHeight)
        console.log(e.clientY)
        console.log(curSlideRef.current.offsetLeft)
        console.log(e)

        // const y = parseInt(result[1]);
        // const x = parseInt(result[2]);
        // const x = e.lastEvent.top;
        // const y = e.lastEvent.left;
        const y = 1*(e.lastEvent.beforeTranslate[0]);
        const x = 1*(e.lastEvent.beforeTranslate[1]);
        console.log(x)
        console.log(y)

        let xPercentage = Math.round((x / slideWidth) * 100, 0) + parseInt(newLocationX);
        let yPercentage = Math.round((y / slideHeight) * 100, 0) + parseInt(newLocationY);
        // let xPercentage = Math.round((x / slideWidth) * 100, 0) ;
        // let yPercentage = Math.round((y / slideHeight) * 100, 0);
        console.log(xPercentage)
        console.log(yPercentage)

        let newHeight = parseInt(e.target.style.height.slice(0,-2));
        let newWidth = parseInt(e.target.style.width.slice(0,-2));

        if (xPercentage < 0) {
            xPercentage = 0;
        } else if (xPercentage + Math.round(newWidth / slideWidth * 100,0) > 100) {
            xPercentage = 100 - Math.round(newWidth / slideWidth * 100,0);
        }
        if (yPercentage < 0) {
            yPercentage = 0;
        } else if (yPercentage + Math.round(newHeight / slideHeight * 100,0) > 100) {
            yPercentage = 100 - Math.round(newHeight / slideHeight * 100,0);
        }

        setNewLocationX(xPercentage);
        setNewLocationY(yPercentage);
    }

    const handleResize = (e) => {
        const slideWidth = curSlideRef.current.offsetWidth;
        const slideHeight = curSlideRef.current.offsetHeight;
        let newHeight = parseInt(e.target.style.height.slice(0,-2));
        let newWidth = parseInt(e.target.style.width.slice(0,-2));

        newHeight = Math.round(newHeight / slideHeight * 100,0) ;
        newWidth = Math.round(newWidth / slideWidth * 100,0);
        setNewHeight(newHeight);
        setNewWidth(newWidth);
    }

    return <>
        <Moveable
            style={customStyles}
            target={targetRef.current}
            draggable={editable}
            throttleDrag={1}
            edgeDraggable={false}
            startDragRotate={0}
            throttleDragRotate={0}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
            onDragEnd={e => {
                handleDrag(e);
            }}
            resizable={editable}
            keepRatio={false}
            throttleResize={1}
            renderDirections={["nw","ne","sw","se"]}
            onResize={e => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
            }}
            onResizeEnd={e => {
                handleResize(e);
                handleDrag(e);
            }}
        />
    </>


}

export default MoveableElement;
    