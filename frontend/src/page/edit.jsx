import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import Text from '../component/text';
import Image from '../component/image';
import VideoElement from '../component/videoElement';

const Edit = function ({ token, curStore, setStoreFn }) {
    
    const params = useParams();    
    const navigate = useNavigate();
    const [addTextPopup, setAddTextPopup] = React.useState(false);
    const [addImagePopup, setAddImagePopup] = React.useState(false);
    const [addVideoPopup, setAddVideoPopup] = React.useState(false);
    // General Variables
    const [elementHeight, setElementHeight] = React.useState('');
    const [elementWidth, setElementWidth] = React.useState('');

    // Text Varaibles
    const [textInput, setTextInput] = React.useState('');
    const [textFontSize, setTextFontSize] = React.useState('');
    const [textColour, setTextColour] = React.useState('');

    // Image Varaibles
    const [imageSrc, setImageSrc] = React.useState('');
    const [imageAltTag, setimageAltTag] = React.useState('');

    //Video Variables 
    const [videoURL, setVideoURL] = React.useState('');
    const [autoPlay, setAutoPlay] = React.useState(false);


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
                setImageSrc(reader.result); // Set the Data URL as the thumbnail
            };
            reader.readAsDataURL(file); // Convert file to Data URL
        }
    }

    const displayCurSlide = () => {
        return <>
            <CurSlide>
                {curStore.allPres[params.presid].slides[params.editid].map((element, index) => {
                    return <>
                        
                        {(element.type === 'text') && (
                        <Text 
                            key={index} // generates warning cause key not unique enough
                            num={index}
                            input={element.textInput} 
                            textAreaSizeHeight={element.textAreaSizeHeight}
                            textAreaSizeWidth={element.textAreaSizeWidth}
                            fontSize={element.textFontSize}
                            colour={element.textColour}
                            curStore={curStore}
                            locationX={element.locationX}
                            locationY={element.locationY}
                            setStoreFn={setStoreFn}
                        ></Text>)}

                        {(element.type === 'image') && (
                        <Image 
                            key={index} // generates warning cause key not unique enough
                            num={index}
                            imgsrc={element.imgsrc} 
                            height={element.height}
                            width={element.width}
                            altTag={element.altTag}
                            curStore={curStore}
                            locationX={element.locationX}
                            locationY={element.locationY}
                            setStoreFn={setStoreFn}
                        ></Image>)}
                        {(element.type === 'video') && (
                        <VideoElement 
                            key={index} // generates warning cause key not unique enough
                            num={index}
                            videoURL={element.url} 
                            height={element.height}
                            width={element.width}
                            autoPlay={element.autoPlay}
                            curStore={curStore}
                            locationX={element.locationX}
                            locationY={element.locationY}
                            setStoreFn={setStoreFn}
                        ></VideoElement>)}
                    </>
                })}
            </CurSlide>
        </>
    }

    const addText = () => {
        // Make sure to add checks for size, input, color, etc.
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid].push({
            'type': 'text',
            'textInput': textInput,
            'textAreaSizeHeight': elementHeight,
            'textAreaSizeWidth': elementWidth,
            'textFontSize': textFontSize,
            'textColour': textColour,
            'locationX': 0,
            'locationY': 0,
        });
        setStoreFn(newStore);
        setAddTextPopup(false);    
    }

    const addImage = () => {
        // Make sure to add checks for size, input, color, etc.
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid].push({
            'type': 'image',
            'imgsrc': imageSrc,
            'height': elementHeight,
            'width': elementWidth,
            'altTag': imageAltTag,
            'locationX': 0,
            'locationY': 0,
        });
        setStoreFn(newStore);
        setAddImagePopup(false);    
    }
    const addVideo = () => {
        // Make sure to add checks for size, input, color, etc.
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid].push({
            'type': 'video',
            'url': videoURL,
            'height': elementHeight,
            'width': elementWidth,
            'autoPlay': autoPlay,
            'locationX': 0,
            'locationY': 0,
        });
        setStoreFn(newStore);
        setAddImagePopup(false);    
    }

    return <>
        <BackDeleteBtnPagePosStyle>
            <div>Currently editing slide: {parseInt(params.editid + 1)}</div>
        </BackDeleteBtnPagePosStyle>
        <BackDeleteBtnPagePosStyle>
            <button onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
            <button onClick={() => navigate(`/Pres/${params.presid}`)}>Back to Presentation</button>
        </BackDeleteBtnPagePosStyle>
        <PresPage>
            {displayCurSlide()}
        </PresPage>
        <BackDeleteBtnPagePosStyle>
            <button onClick={() => setAddTextPopup(true)}>Add Text Box</button>
            <button onClick={() => setAddImagePopup(true)}>Add Image</button>
            <button onClick={() => setAddVideoPopup(true)}>Add Video</button>
        </BackDeleteBtnPagePosStyle>

        {addTextPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div><u>ADD TEXT BOX</u></div>
                        <div>
                            Textarea Size Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setElementHeight(e.target.value)} /><br />
                        <div>
                            Textarea Size Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setElementWidth(e.target.value)} /><br />
                        <div>
                            Textarea Input:
                        </div>
                        <InputForLogReg type="text" onChange={e => setTextInput(e.target.value)} /><br />
                        <div>
                            Font size {'[em]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setTextFontSize(e.target.value)} /><br />
                        <div>
                            Text Color {'[HEX COLOR CODE]'}:
                        </div>
                        <InputForLogReg type="color" onChange={e => setTextColour(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => addText()}>Submit</button>
                            <button onClick={() => setAddTextPopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}
        {addImagePopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div><u>ADD IMAGE</u></div>
                        <div>
                            Image Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setElementHeight(e.target.value)} /><br />
                        <div>
                            Image Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setElementWidth(e.target.value)} /><br />
                        <div>
                            Image File:
                        </div>
                        <InputForLogReg type="file" onChange={fileToDataUrl} /><br />
                        <div>
                            alt tag for image:
                        </div>
                        <InputForLogReg type="text" onChange={e => setimageAltTag(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => addImage()}>Submit</button>
                            <button onClick={() => setAddImagePopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}
        {addVideoPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div><u>ADD VIDEO</u></div>
                        <div>
                            Video Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setElementHeight(e.target.value)} /><br />
                        <div>
                            Video Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setElementWidth(e.target.value)} /><br />
                        <div>
                            Video URL:
                        </div>
                        <InputForLogReg type="text" onChange={e => setVideoURL(e.target.value)} /><br />
                        <div>
                           Auto Play:
                        </div>
                        <InputForLogReg type="checkbox" onChange={e => setAutoPlay(e.target.checked)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => addVideo()}>Submit</button>
                            <button onClick={() => setAddVideoPopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}
    </>;
}

export default Edit;