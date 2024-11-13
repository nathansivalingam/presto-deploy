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

const VideoElement = ({ num, videoURL, height, width, autoPlay, curStore, locationX, locationY, setStoreFn, curSlideRef, curSlideNum, editable }) => {
    const params = useParams();
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    const [editVideoPopup, setEditVideoPopup] = React.useState(false);
    const [newHeight, setNewHeight] = React.useState(height);
    const [newWidth, setNewWidth] = React.useState(width);
    const [newVideoURL, setNewVideoURL] = React.useState(videoURL);
    const [newAutoPlay, setNewAutoPlay] = React.useState(autoPlay);
    const [newLocationX, setNewLocationX] = React.useState(locationX);
    const [newLocationY, setNewLocationY] = React.useState(locationY);
    
    const [moveResizeable, setMoveResizeable] = React.useState(false);
    const targetRef = React.useRef(null);
    
    React.useEffect(() => {
        editVideo();
    }, [newLocationX, newLocationY, newWidth, newHeight])

    const handleDoubleClick = () => {
        const currentTime = Date.now();
        if (currentTime - finalClickTime <= 500) {
            console.log('double cliock happened')
            setEditVideoPopup(true);
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

    const editVideo = () => {
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[curSlideNum][num] = {
            'type': 'video',
            'url': newVideoURL,
            'height': newHeight,
            'width': newWidth,
            'autoPlay': newAutoPlay,
            'locationX': newLocationX,
            'locationY': newLocationY,
        }
        setStoreFn(newStore);
        //console.log(newStore.allPres[params.presid].slides[params.editid]);
        setEditVideoPopup(false);
    }
    
    const MyVideo = () => {
        const autoplayParam = newAutoPlay ? "1" : "0";
        const customStyles = {
            width: `${newWidth}%`,
            height: `${newHeight}%`,
            top: `${newLocationX}%`,
            left: `${newLocationY}%`,
            position: 'absolute',
            backgroundColor: 'black',
            display: 'flex'
        };
        
        return <>
            <div ref={targetRef} style={customStyles}>
                <iframe 
                    src={`${videoURL}&autoplay=${autoplayParam}&mute=1`}
                    onClick={handleDoubleClick}
                    onContextMenu={handleRightClick}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        padding: '10px',
                        flex: '1',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                >
                </iframe>
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
    }

    return <>
        <MyVideo/>

        {editable && editVideoPopup && (
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
                            Video URL
                        </div>
                        <InputForLogReg type="text" value={newVideoURL} onChange={e => setNewVideoURL(e.target.value)} /><br />
                        <div>
                            Auto Play
                        </div>
                        <InputForLogReg type="checkbox" checked={newAutoPlay} onChange={e => setNewAutoPlay(e.target.checked)} /><br />
                        <div>
                            X-Coordinate {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newLocationX} onChange={e => setNewLocationX(e.target.value)} />
                        <div>
                            Y-Coordinate {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={newLocationY} onChange={e => setNewLocationY(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => editVideo()}>Submit</button>
                            <button onClick={() => setEditVideoPopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopupStyle>
            </>
        )}
    </>
}

export default VideoElement;