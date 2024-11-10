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

const VideoElement = ({ num, videoURL, height, width, autoPlay, curStore, locationX, locationY, setStoreFn }) => {
    const params = useParams();
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    const [editVideoPopup, setEditVideoPopup] = React.useState(false);
    const [newHeight, setNewHeight] = React.useState(height);
    const [newWidth, setnewWidth] = React.useState(width);
    const [newVideoURL, setNewVideoURL] = React.useState(videoURL);
    const [newAutoPlay, setNewAutoPlay] = React.useState(autoPlay);
    const [newLocationX, setNewLocationX] = React.useState(locationX);
    const [newLocationY, setNewLocationY] = React.useState(locationY);

    const handleDoubleClick = () => {
        const currentTime = Date.now();
        if (currentTime - finalClickTime <= 500) {
            setEditVideoPopup(true);
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

    const editVideo = () => {
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid][num] = {
            'type': 'video',
            'url': newVideoURL,
            'height': newHeight,
            'width': newWidth,
            'autoPlay': newAutoPlay,
            'locationX': newLocationX,
            'locationY': newLocationY,
        }
        setStoreFn(newStore);
        console.log(newStore.allPres[params.presid].slides[params.editid]);
        setEditImagePopup(false);
    }
    
    const MyVideo = () => {
        const autoplayParam = newAutoPlay ? "1" : "0";
        console.log(autoplayParam);
        return <>
            <iframe 
                src={`${videoURL}?autoplay=${autoplayParam}`}
                onClick={handleDoubleClick}
                onContextMenu={handleRightClick}
                style={{
                    width: `${width}%`,
                    height: `${height}%`,
                    top: `${newLocationY}%`,
                    left: `${newLocationX}%`,
                    position: 'absolute',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder="0"
            >
            </iframe>
        </>
    }

    return <>
        <MyVideo></MyVideo>

        {editVideoPopup && (
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
                        <InputForLogReg type="number" value={newWidth} onChange={e => setnewWidth(e.target.value)} /><br />
                        <div>
                            Video URL
                        </div>
                        <InputForLogReg type="text" value={newVideoURL} onChange={e => setNewVideoURL(e.target.value)} /><br />
                        <div>
                            Auto Play
                        </div>
                        <InputForLogReg type="checkbox" checked={newAutoPlay} onChange={e => setAutoPlay(e.target.checked)} /><br />
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