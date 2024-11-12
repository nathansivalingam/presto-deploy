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

const Code = ({ num, input, height, width, fontSize, curStore, locationX, locationY, setStoreFn, curSlideRef }) => {
    const params = useParams();
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    const [editCodePopup, setEditCodePopup] = React.useState(false);
    const [newHeight, setNewHeight] = React.useState(height);
    const [newWidth, setNewWidth] = React.useState(width);
    const [newCodeInput, setNewCodeInput] = React.useState(input);
    const [newCodeFontSize, setNewCodeFontSize] = React.useState(fontSize);
    const [newLocationX, setNewLocationX] = React.useState(locationX);
    const [newLocationY, setNewLocationY] = React.useState(locationY);
    const targetRef = useRef(null);
    const [newElementPosition, setNewElementPosition] = React.useState('');

    React.useEffect(() => {
            console.log("HIT")
            editCode();
        }, [newLocationX, newLocationY])
    

    const handleDoubleClick = () => {
        const currentTime = Date.now();
        if (currentTime - finalClickTime <= 500) {
            setEditCodePopup(true);
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                setClickTimeout(null);
            }
        } else {
            const timeout = setTimeout(() => {
                setClickTimeout(null);
            }, 500);
            setClickTimeout(timeout);
        }
        setFinalClickTime(currentTime);
    };

    const handleRightClick = () => {
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid].splice(num, 1);
        setStoreFn(newStore);
    }

    const editCode = () => {
        //console.log('Hi');
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid][num] = {
            'type': 'code',
            'codeInput': newCodeInput,
            'height': newHeight,
            'width': newWidth,
            'codeFontSize': newCodeFontSize,
            'locationX': newLocationX,
            'locationY': newLocationY,
        }
        setStoreFn(newStore);
        //console.log(newStore.allPres[params.presid].slides[params.editid]);
        setEditCodePopup(false);
    }

    const MyCode = () => {

        const [language, setLanguage] = useState('python');
        React.useEffect(() => {
            const detectedLanguage = hljs.highlightAuto(input).language;
            setLanguage(detectedLanguage);
            //console.log(detectedLanguage);
        }, [input]);
        // React.useEffect(() => {
        //     console.log("HIT")
        //     editCode();
        // }, [newLocationX, newLocationY])
        
        const customStyles = {
            width: `${width}%`,
            height: `${height}%`,
            top: `${newLocationX}%`,
            left: `${newLocationY}%`,
            fontSize: `${fontSize}em`,
            borderWidth: '1px',
            borderColor: 'lightgrey',
            borderStyle: 'solid',
            position: 'absolute',
            marginTop: '0px',
            backgroundColor: '#f7faf9',
        };

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

            const y = parseInt(result[1]);
            const x = parseInt(result[2]);

            const xPercentage = Math.round((x / slideWidth) * 100, 0) + parseInt(newLocationX);
            const yPercentage = Math.round((y / slideHeight) * 100, 0) + parseInt(newLocationY);
            // console.log(xPercentage);
            // console.log(yPercentage);

            setNewLocationX(xPercentage);
            setNewLocationY(yPercentage);
        }
    
        return (
            <>
                <div ref={targetRef} style={customStyles} onClick={handleDoubleClick}>
                    <SyntaxHighlighter
                        language={language}
                        onContextMenu={handleRightClick}
                        style={{
                            ...docco,
                        }}
                    >
                        {input}
                    </SyntaxHighlighter>
                </div>
                <Moveable
                    style={customStyles}
                    target={targetRef.current}
                    draggable={true}
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
                />
            </>
        );
    };

    return <>
        <MyCode></MyCode>

        {editCodePopup && (
            <>
                <NewPresPopupStyle>
                    <NewPresPopupStyle>
                        <div><u>EDIT CODE BOX</u></div>
                        <div>
                            Code Area Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newHeight} onChange={e => setNewHeight(e.target.value)} /><br />
                        <div>
                            Code Area Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newWidth} onChange={e => setNewWidth(e.target.value)} /><br />
                        <div>
                            Code Input:
                        </div>
                        <CodeInputTextArea rows="4" cols="50" value={newCodeInput} onChange={e => setNewCodeInput(e.target.value)} /><br/>
                        {/* <InputForLogReg type="text" value={newCodeInput} onChange={e => setNewCodeInput(e.target.value)} /><br /> */}
                        <div>
                            Font size {'[em]'}:
                        </div>
                        <InputForLogReg type="number" value={newCodeFontSize} onChange={e => setNewCodeFontSize(e.target.value)} /><br />
                        <div>
                            X-Coordinate {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newLocationX} onChange={e => setNewLocationX(e.target.value)} />
                        <div>
                            Y-Coordinate {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newLocationY} onChange={e => setNewLocationY(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => editCode()}>Submit</button>
                            <button onClick={() => setEditCodePopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopupStyle>
            </>
        )}
    </>
}

export default Code;