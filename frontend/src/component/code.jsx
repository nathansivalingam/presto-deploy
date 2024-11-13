import React, { useState, useRef } from 'react';
import { NewPresPopupStyle, 
    YesNoBtnStyle, 
    InputForLogReg, 
    CodeInputTextArea } from '../styles/styledComponents';
import { useParams } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import hljs from 'highlight.js';
import styled, { createGlobalStyle } from 'styled-components';
import MoveableElement from '../component/moveableElement';


const GlobalStyle = createGlobalStyle`
  /* Customize the resize handles to be black squares */
  .moveable-handle {
    width: 50px;
    height: 50px;
    background-color: black;
    border-radius: 0; /* Ensure the handles are squares */
    transition: background-color 0.2s ease-in-out;
  }

  /* Optional: Style hover effect */
  .moveable-handle:hover {
    background-color: #333;
  }`
;

const Code = ({ num, input, height, width, fontSize, curStore, locationX, locationY, setStoreFn, curSlideRef, curSlideNum, editable }) => {
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
    const [moveResizeable, setMoveResizeable] = React.useState(false);

    React.useEffect(() => {
        console.log("HIT")
        editCode();
    }, [newLocationX, newLocationY, newWidth, newHeight])
    

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
                // setClickTimeout(null);
                setMoveResizeable(!moveResizeable);
            }, 500);
            setClickTimeout(timeout);
        }
        setFinalClickTime(currentTime);
    };

    const handleRightClick = () => {
        if (!editable) {
            return;
        }
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[curSlideNum].splice(num, 1);
        setStoreFn(newStore);
    }

    const editCode = () => {
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[curSlideNum][num] = {
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
        }, [input]);

        const customStyles = {
            width: `${newWidth}%`,
            height: `${newHeight}%`,
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
            
        return (
            <>
                <GlobalStyle/>
                <div ref={targetRef} style={customStyles} onClick={handleDoubleClick} onContextMenu={handleRightClick}>
                    <SyntaxHighlighter
                        language={language}
                        style={{
                            ...docco,
                        }}
                    >
                        {input}
                    </SyntaxHighlighter>
                </div>
                {editable && moveResizeable &&
                    (<MoveableElement
                        curSlideRef={curSlideRef}
                        editable={editable}
                        targetRef={targetRef}
                        customStyles={customStyles}
                        newLocationX={newLocationX}
                        newLocationY={newLocationY}
                        setNewLocationX={setNewLocationX}
                        setNewLocationY={setNewLocationY}
                        setNewHeight={setNewHeight}
                        setNewWidth={setNewWidth}
                    />)
                }
            </>
        );
    };

    return <>
        <MyCode></MyCode>

        {(editable && editCodePopup) && (
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