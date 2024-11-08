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

const Edit = function ({ token, curStore, setStoreFn }) {
    
    const params = useParams();    
    const [curSlideNum, setCurSlideNum] = React.useState(0);
    const [addTextPopup, setAddTextPopup] = React.useState(false);
    const navigate = useNavigate();
    
    const [textSize, setTextSize] = React.useState('');
    const [textInput, setTextInput] = React.useState('');
    const [textFontSize, setTextFontSize] = React.useState('');
    const [textColour, setTextColour] = React.useState('');

    const displayCurSlide = () => {
        return <>
            <CurSlide>
            </CurSlide>
        </>
    }

    const addText = () => {

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
                        <InputForLogReg type="number" value={textSize} onChange={e => setTextSize(e.target.value)} /><br />
                        <div>
                            Textarea Input:
                        </div>
                        <InputForLogReg type="text" value={textInput} onChange={e => setTextInput(e.target.value)} /><br />
                        <div>
                            Font size {'[em]'}:
                        </div>
                        <InputForLogReg type="number" value={textFontSize} onChange={e => setTextFontSize(e.target.value)} /><br />
                        <div>
                            Text Color {'[HEX COLOUR CODE]'}:
                        </div>
                        <InputForLogReg type="text" value={textColour} onChange={e => setTextColour(e.target.value)} /><br />
                        <YesNoBtnStyle>
                            <button onClick={() => addText()}>Submit</button>
                            <button onClick={() => setAddTextPopup(false)}>Cancel</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}
    </>;
}

export default Edit;