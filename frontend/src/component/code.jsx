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

const Code = ({ num, input, height, width, fontSize, curStore, locationX, locationY, setStoreFn }) => {
    const params = useParams();
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    const [editCodePopup, setEditCodePopup] = React.useState(false);
    const [newHeight, setNewHeight] = React.useState(textAreaSizeHeight);
    const [newWidth, setNewWidth] = React.useState(textAreaSizeWidth);
    const [newCodeInput, setNewCodeInput] = React.useState(input);
    const [newCodeFontSize, setNewCodeFontSize] = React.useState(fontSize);
    const [newLocationX, setNewLocationX] = React.useState(locationX);
    const [newLocationY, setNewLocationY] = React.useState(locationY);

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
        console.log(newStore.allPres[params.presid].slides[params.editid]);
        setEditCodePopup(false);
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

        {editCodePopup && (
            <>
                <NewPresPopupStyle>
                    <NewPresPopupStyle>
                        <div><u>EDIT CODE BOX</u></div>
                        <div>
                            Code Area Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newTextAreaSizeHeight} onChange={e => setNewTextAreaSizeHeight(e.target.value)} /><br />
                        <div>
                            Code Area Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newTextAreaSizeWidth} onChange={e => setNewTextAreaSizeWidth(e.target.value)} /><br />
                        <div>
                            Code Input:
                        </div>
                        <InputForLogReg type="text" value={newTextInput} onChange={e => setNewTextInput(e.target.value)} /><br />
                        <div>
                            Font size {'[em]'}:
                        </div>
                        <InputForLogReg type="number" value={newTextFontSize} onChange={e => setNewTextFontSize(e.target.value)} /><br />
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

export default Code;