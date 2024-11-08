import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurSlide, 
    PresPage,
    BackDeleteBtnPagePosStyle,
    SlideNumberStyle } from '../styles/styledComponents';

const Edit = function ({ token, curStore, setStoreFn }) {
    
    const params = useParams();    
    const [curSlideNum, setCurSlideNum] = React.useState(0);
    const [addTextPopup, setAddTextPopup] = React.useState('false');

    const navigate = useNavigate();

    const displayCurSlide = () => {
        return <>
            <CurSlide>
                <SlideNumberStyle>
                    {curSlideNum + 1}
                </SlideNumberStyle>
            </CurSlide>
        </>
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
            <button onClick={() => addTextFn(`/page/edit/${params.editid}`)}>Add Text</button>
        </BackDeleteBtnPagePosStyle>
    </>;

}

export default Edit;