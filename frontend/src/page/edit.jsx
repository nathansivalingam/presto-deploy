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
    const [curSlideNum, setCurSlideNum] = React.useState(0);
    const [addTextPopup, setAddTextPopup] = React.useState(false);
    const [editTextPopup, setEditTextPopup] = React.useState(false);
    const navigate = useNavigate();
    
    const [textAreaSize, setTextAreaSize] = React.useState('');
    const [textInput, setTextInput] = React.useState('');
    const [textFontSize, setTextFontSize] = React.useState('');
    const [textColour, setTextColour] = React.useState('');

    const displayCurSlide = () => {
        console.log(curStore.allPres[params.presid].slides[params.editid]);
        return <>
            <CurSlide>
                {curStore.allPres[params.presid].slides[params.editid].map((element, index) => {
                    return <>
                        <Text key={index} // generates warning cause key not unique enough
                            input={element.textInput} 
                            areaSize={element.textAreaSize}
                            fontSize={element.textFontSize}
                            colour={element.textColour}
                            setEditTextPopup={setEditTextPopup}
                        ></Text>
                    </>
                })}
            </CurSlide>
        </>
    }

    const editText = () => {

        setStoreFn(newStore);
        setEditTextPopup(false);
    }

    const addText = () => {
        // Make sure to add checks for size, input, color, etc.
        const newStore = {...curStore};
        newStore.allPres[params.presid].slides[params.editid].push({
            'type': 'text',
            'textInput': textInput,
            'textAreaSize': textAreaSize,
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
        </BackDeleteBtnPagePosStyle>

        {addTextPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div>ADD TEXT BOX</div>
                        <div>
                            Textarea Size {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={textAreaSize} onChange={e => setTextAreaSize(e.target.value)} /><br />
                        <div>
                            Textarea Input:
                        </div>
                        <InputForLogReg type="text" value={textInput} onChange={e => setTextInput(e.target.value)} /><br />
                        <div>
                            Font size {'[em]'}:
                        </div>
                        <InputForLogReg type="number" value={textFontSize} onChange={e => setTextFontSize(e.target.value)} /><br />
                        <div>
                            Text Color {'[HEX COLOR CODE]'}:
                        </div>
                        <InputForLogReg type="color" value={textColour} onChange={e => setTextColour(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => addText()}>Submit</button>
                            <button onClick={() => setAddTextPopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}

        {editTextPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div>EDIT TEXT BOX</div>
                        <div>
                            Textarea Size {'[0 < % < 100]'}:
                        </div>
                        <InputForLogReg type="number" value={textAreaSize} onChange={e => setTextAreaSize(e.target.value)} /><br />
                        <div>
                            Textarea Input:
                        </div>
                        <InputForLogReg type="text" value={textInput} onChange={e => setTextInput(e.target.value)} /><br />
                        <div>
                            Font size {'[em]'}:
                        </div>
                        <InputForLogReg type="number" value={textFontSize} onChange={e => setTextFontSize(e.target.value)} /><br />
                        <div>
                            Text Color {'[HEX COLOR CODE]'}:
                        </div>
                        <InputForLogReg type="color" value={textColour} onChange={e => setTextColour(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => editText()}>Submit</button>
                            <button onClick={() => setEditTextPopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}
    </>;
}

export default Edit;