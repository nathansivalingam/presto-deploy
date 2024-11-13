import React, { useState } from 'react';
import { CurSlide, 
    PresPage,
    NewPresPopUpDiv,
    NewPresPopupStyle, 
    BackDeleteBtnPagePosStyle,
    YesNoBtnStyle, 
    InputForLogReg, 
    ThumbnailStyle, 
    ThumbnailImg, 
    SlideNumberStyle } from '../styles/styledComponents';
import { useParams } from 'react-router-dom';
import MoveableElement from '../component/moveableElement';
// import hljs from 'highlight.js';;

const Text = ({ num, input, height, width, fontSize, colour, curStore, locationX, locationY, setStoreFn, curSlideRef, curSlideNum, editable, font }) => {
    const params = useParams();
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    const [editTextPopup, setEditTextPopup] = React.useState(false);
    const [newHeight, setNewHeight] = React.useState(height);
    const [newWidth, setNewWidth] = React.useState(width);
    const [newTextInput, setNewTextInput] = React.useState(input);
    const [newTextFontSize, setNewTextFontSize] = React.useState(fontSize);
    const [newTextColour, setNewTextColour] = React.useState(colour);
    const [newLocationX, setNewLocationX] = React.useState(locationX);
    const [newLocationY, setNewLocationY] = React.useState(locationY);
    const targetRef = React.useRef(null);
    const [moveResizeable, setMoveResizeable] = React.useState(false);

    React.useEffect(() => {
        console.log("HIT")
        editText();
    }, [newLocationX, newLocationY, newWidth, newHeight])

    const handleDoubleClick = () => {
        const currentTime = Date.now();
        if (currentTime - finalClickTime <= 500) {
            setEditTextPopup(true);
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                setClickTimeout(null);
            }
        } else {
            const timeout = setTimeout(() => {
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

    const editText = () => {
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[curSlideNum][num] = {
            'type': 'text',
            'textInput': newTextInput,
            'textAreaSizeHeight': newHeight,
            'textAreaSizeWidth': newWidth,
            'textFontSize': newTextFontSize,
            'textColour': newTextColour,
            'locationX': newLocationX,
            'locationY': newLocationY,
        }
        setStoreFn(newStore);
        //console.log(newStore.allPres[params.presid].slides[params.editid]);
        setEditTextPopup(false);
    }
    
    const MyText = () => {
        const customStyles = {
            width: `${newWidth}%`,
            height: `${newHeight}%`,
            top: `${newLocationX}%`,
            left: `${newLocationY}%`,
            fontSize: `${fontSize}em`,
            color: `${colour}`,
            borderWidth: '1px',
            borderColor: 'lightgrey',
            borderStyle: 'solid',
            // overflow: 'hidden',
            position: 'absolute',
            marginTop: '0px',
            fontFamily: font,
        };

        return (
            <>
                <div
                    ref={targetRef}
                    onClick={handleDoubleClick}
                    onContextMenu={handleRightClick}
                    style={customStyles}
                    >
                    {input}
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
    }

    return <>
        <MyText></MyText>

        {editable && editTextPopup && (
            <>
                <NewPresPopupStyle>
                    <NewPresPopupStyle>
                        <div><u>EDIT TEXT BOX</u></div>
                        <div>
                            Textarea Size Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newHeight} onChange={e => setNewHeight(e.target.value)} /><br />
                        <div>
                            Textarea Size Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newWidth} onChange={e => setNewWidth(e.target.value)} /><br />
                        <div>
                            Textarea Input:
                        </div>
                        <InputForLogReg type="text" value={newTextInput} onChange={e => setNewTextInput(e.target.value)} /><br />
                        <div>
                            Font size {'[em]'}:
                        </div>
                        <InputForLogReg type="number" value={newTextFontSize} onChange={e => setNewTextFontSize(e.target.value)} /><br />
                        <div>
                            Text Color {'[HEX COLOR CODE]'}:
                        </div>
                        <InputForLogReg type="color" value={newTextColour} onChange={e => setNewTextColour(e.target.value)} /><br />
                        <div>
                            X-Coordinate {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newLocationX} onChange={e => setNewLocationX(e.target.value)} />
                        <div>
                            Y-Coordinate {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newLocationY} onChange={e => setNewLocationY(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => editText()}>Submit</button>
                            <button onClick={() => setEditTextPopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopupStyle>
            </>
        )}
    </>
}

export default Text;