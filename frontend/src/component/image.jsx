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
import hljs from 'highlight.js';

const Image = ({ num, imgsrc, height, width, altTag, curStore, locationX, locationY, setStoreFn, curSlideRef, curSlideNum, editable }) => {
    const params = useParams();
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    const [editImagePopup, setEditImagePopup] = React.useState(false);
    const [newHeight, setNewHeight] = React.useState(height);
    const [newWidth, setNewWidth] = React.useState(width);
    const [newImgSrc, setNewImgSrc] = React.useState(imgsrc);
    const [newImgAltTag, setNewImgAltTag] = React.useState(altTag);
    const [newLocationX, setNewLocationX] = React.useState(locationX);
    const [newLocationY, setNewLocationY] = React.useState(locationY);

    const targetRef = React.useRef(null);
    const [moveResizeable, setMoveResizeable] = React.useState(false);

    React.useEffect(() => {
        console.log("HIT")
        editImage();
    }, [newLocationX, newLocationY, newWidth, newHeight])

    const  fileToDataUrl = (event) => {
        const file = event.target.files[0];
        const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
        const valid = validFileTypes.includes(file.type);
        // // Bad data, let's walk away.
        if (!valid) {
             throw Error('provided file is not a png, jpg or jpeg image.');
         }
        
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewImgSrc(reader.result); // Set the Data URL as the thumbnail
            };
            reader.readAsDataURL(file); // Convert file to Data URL
        }
    }

    const handleDoubleClick = () => {
        const currentTime = Date.now();
        if (currentTime - finalClickTime <= 500) {
            setEditImagePopup(true);
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                setClickTimeout(null);
            }
        } else {
            const timeout = setTimeout(() => {
                //setClickTimeout(null);
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

    const editImage = () => {
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[curSlideNum][num] = {
            'type': 'image',
            'imgsrc': newImgSrc,
            'height': newHeight,
            'width': newWidth,
            'altTag': newImgAltTag,
            'locationX': newLocationX,
            'locationY': newLocationY,
        }
        setStoreFn(newStore);
        //console.log(newStore.allPres[params.presid].slides[params.editid]);
        setEditImagePopup(false);
    }
    
    const MyImage = () => {
        const customStyles = {
            width: `${newWidth}%`,
            height: `${newHeight}%`,
            top: `${newLocationX}%`,
            left: `${newLocationY}%`,
            position: 'absolute',
        };
        
        return <>
            <img
                ref={targetRef}
                src={imgsrc}
                alt={altTag}
                onClick={handleDoubleClick}
                onContextMenu={handleRightClick}
                style={customStyles}
                />
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
    }

    return <>
        <MyImage></MyImage>

        {editable && editImagePopup && (
            <>
                <NewPresPopupStyle>
                    <NewPresPopupStyle>
                        <div><u>EDIT IMAGE</u></div>
                        <div>
                            Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newHeight} onChange={e => setNewHeight(e.target.value)} /><br />
                        <div>
                            Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newWidth} onChange={e => setNewWidth(e.target.value)} /><br />
                        <div>
                            Image Source
                        </div>
                        <InputForLogReg type="file" onChange={fileToDataUrl} /><br />
                        <div>
                            Alt tag
                        </div>
                        <InputForLogReg type="text" value={newImgAltTag} onChange={e => setNewImgAltTag(e.target.value)} /><br />
                        <div>
                            X-Coordinate {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newLocationX} onChange={e => setNewLocationX(e.target.value)} />
                        <div>
                            Y-Coordinate {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newLocationY} onChange={e => setNewLocationY(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => editImage()}>Submit</button>
                            <button onClick={() => setEditImagePopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopupStyle>
            </>
        )}
    </>
}

export default Image;