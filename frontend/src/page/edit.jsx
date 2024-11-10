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

const Edit = function ({ token, curStore, setStoreFn }) {
    
    const params = useParams();    
    const navigate = useNavigate();
    const [addTextPopup, setAddTextPopup] = React.useState(false);
    const [addImagePopup, setAddImagePopup] = React.useState(false);
    
    // Text Variables
    const [textAreaSizeHeight, setTextAreaSizeHeight] = React.useState('');
    const [textAreaSizeWidth, setTextAreaSizeWidth] = React.useState('');
    const [textInput, setTextInput] = React.useState('');
    const [textFontSize, setTextFontSize] = React.useState('');
    const [textColour, setTextColour] = React.useState('');

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
                        <Text 
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
                        ></Text>)}

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
            'textAreaSizeHeight': textAreaSizeHeight,
            'textAreaSizeWidth': textAreaSizeWidth,
            'textFontSize': textFontSize,
            'textColour': textColour,
            'locationX': 0,
            'locationY': 0,
        });
        setStoreFn(newStore);
        setAddTextPopup(false);    
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
        </BackDeleteBtnPagePosStyle>

        {addTextPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div><u>ADD TEXT BOX</u></div>
                        <div>
                            Textarea Size Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setTextAreaSizeHeight(e.target.value)} /><br />
                        <div>
                            Textarea Size Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setTextAreaSizeWidth(e.target.value)} /><br />
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
                        <div><u>ADD TEXT BOX</u></div>
                        <div>
                            Image Height {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setTextAreaSizeHeight(e.target.value)} /><br />
                        <div>
                            Image Width {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" onChange={e => setTextAreaSizeWidth(e.target.value)} /><br />
                        <div>
                            Image File:
                        </div>
                        <InputForLogReg type="file" onChange={e => setTextInput(e.target.value)} /><br />
                        <div>
                            alt tag for image:
                        </div>
                        <InputForLogReg type="text" onChange={e => setTextFontSize(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => addImage()}>Submit</button>
                            <button onClick={() => setAddImagePopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}
    </>;
}

export default Edit;