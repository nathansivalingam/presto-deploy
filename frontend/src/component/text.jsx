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

const Text = ({ num, input, textAreaSizeHeight, textAreaSizeWidth, fontSize, colour, curStore, locationX, locationY, setStoreFn }) => {
    const params = useParams();
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    const [editTextPopup, setEditTextPopup] = React.useState(false);
    const [newTextAreaSizeHeight, setNewTextAreaSizeHeight] = React.useState(textAreaSizeHeight);
    const [newTextAreaSizeWidth, setNewTextAreaSizeWidth] = React.useState(textAreaSizeWidth);
    const [newTextInput, setNewTextInput] = React.useState(input);
    const [newTextFontSize, setNewTextFontSize] = React.useState(fontSize);
    const [newTextColour, setNewTextColour] = React.useState(colour);
    const [newLocationX, setNewLocationX] = React.useState(locationX);
    const [newLocationY, setNewLocationY] = React.useState(locationY);

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

    const editText = () => {
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid][num] = {
            'type': 'text',
            'textInput': newTextInput,
            'textAreaSizeHeight': newTextAreaSizeHeight,
            'textAreaSizeWidth': newTextAreaSizeWidth,
            'textFontSize': newTextFontSize,
            'textColour': newTextColour,
            'locationX': locationX,
            'locationY': locationY,
        }
        setStoreFn(newStore);
        console.log(newStore.allPres[params.presid].slides[params.editid]);
        setEditTextPopup(false);
    }
    
    const MyText = () => {
        return <>
            <div
                onClick={handleDoubleClick}
                onContextMenu={handleRightClick}
                style={{
                    width: `${textAreaSizeWidth}%`,
                    height: `${textAreaSizeHeight}%`,
                    top: `${newLocationY}%`,
                    left: `${newLocationX}%`,
                    fontSize: `${fontSize}em`,
                    color: `${colour}`,
                    borderWidth: '1px',
                    borderColor: 'lightgrey',
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    position: 'absolute',
                }}
                >
                {input}
            </div>
        </>
    }

    return <>
        <MyText></MyText>

        {editTextPopup && (
            <>
                <NewPresPopupStyle>
                    <NewPresPopupStyle>
                        <div><u>EDIT TEXT BOX</u></div>
                        <div>
                            Textarea Size Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newTextAreaSizeHeight} onChange={e => setNewTextAreaSizeHeight(e.target.value)} /><br />
                        <div>
                            Textarea Size Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newTextAreaSizeWidth} onChange={e => setNewTextAreaSizeWidth(e.target.value)} /><br />
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