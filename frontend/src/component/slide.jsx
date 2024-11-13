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
    CodeInputTextArea,
    SlideNumberStyle } from '../styles/styledComponents';
import Text from '../component/text';
import Image from '../component/image';
import VideoElement from '../component/videoElement';
import Code from '../component/code';


const Slide = function ({ token, curStore, setStoreFn, editable, curSlideNum }) { 
    const curSlideRef = React.useRef(null);
    const params = useParams();
    const displayCurSlide = () => {
        return <>
            <CurSlide ref={curSlideRef}>
                {curStore.allPres[params.presid].slides[curSlideNum].map((element, index) => {
                    return <>
                        {(element.type === 'text') && (
                        <Text 
                            key={index} // generates warning cause key not unique enough
                            num={index}
                            input={element.textInput} 
                            height={element.textAreaSizeHeight}
                            width={element.textAreaSizeWidth}
                            fontSize={element.textFontSize}
                            colour={element.textColour}
                            curStore={curStore}
                            locationX={element.locationX}
                            locationY={element.locationY}
                            setStoreFn={setStoreFn}
                            curSlideRef={curSlideRef}
                            curSlideNum={curSlideNum}
                            editable={editable}
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
                        {(element.type === 'code') && (
                        <Code 
                            key={index} // generates warning cause key not unique enough
                            num={index}
                            input={element.codeInput} 
                            height={element.height}
                            width={element.width}
                            fontSize={element.codeFontSize}
                            curStore={curStore}
                            locationX={element.locationX}
                            locationY={element.locationY}
                            setStoreFn={setStoreFn}
                            curSlideRef={curSlideRef}
                            curSlideNum={curSlideNum}
                            editable={editable}
                        ></Code>)}
                    </>
                })}
                {!editable && (
                <> 
                    <SlideNumberStyle>
                    {curSlideNum + 1}
                    </SlideNumberStyle>
                </>
        )}
            </CurSlide>
        </>
    }

    return  <>
        {displayCurSlide()}
    </>

}


export default Slide;