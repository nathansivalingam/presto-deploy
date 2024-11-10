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

const Image = ({ num, imgsrc, height, width, altTag, curStore, locationX, locationY, setStoreFn }) => {
    const params = useParams();
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    const [editImagePopup, setEditImagePopup] = React.useState(false);
    const [newHeight, setNewHeight] = React.useState(height);
    const [newWidth, setnewWidth] = React.useState(width);
    const [newImgSrc, setNewImgSrc] = React.useState(imgsrc);
    const [newImgAltTag, setNewImgAltTag] = React.useState(altTag);
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

    const editImage = () => {
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid][num] = {
            'type': 'image',
            'imgsrc': newImgSrc,
            'height': newHeight,
            'width': newWidth,
            'altTag': newImgAltTag,
            'locationX': newLocationX,
            'locationY': newLocationY,
        }
        setStoreFn(newStore);
        console.log(newStore.allPres[params.presid].slides[params.editid]);
        setEditTextPopup(false);
    }
    
    const MyImage = () => {
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
        <MyImage></MyImage>

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

export default Image;