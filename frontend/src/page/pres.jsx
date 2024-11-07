import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurSlide, 
    PresPage,
    NewPresPopUpDiv,
    NewPresPopupStyle, 
    BackDeleteBtnPagePosStyle,
    YesNoBtnStyle } from '../styles/styledComponents';


const Pres = function ({ token, curStore, setStoreFn }) {
    const [curSlideNum, setCurSlideNum] = React.useState(0);
    const [deletePresPopup, setDeletePresPopup] = React.useState(false);
    const params = useParams();
    
    //const firstSlide = newStore?.allPres?.[params.presid]?.slides?.[0];
    const navigate = useNavigate();

    const displayCurSlide = () => {
        return <CurSlide>This is the first slide = {curSlideNum}</CurSlide>
    }

    const deletePres = () => {
        const newStore = {...curStore};
        const deletePresNum = params.presid;
        console.log(params.presid);

        setStoreFn(newStore);
        setDeletePresPopup(false);
        navigate('/dashboard');
    }
    
    return <>
        <BackDeleteBtnPagePosStyle>
            <button onClick={() => navigate('/Dashboard')}>Back</button>
            <button onClick={() => setDeletePresPopup(true)}>Delete Presentation</button>
        </BackDeleteBtnPagePosStyle>
        <PresPage>
            {displayCurSlide()}
        </PresPage>

        {deletePresPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div>Are you sure?</div>
                        <YesNoBtnStyle>
                            <button onClick={() => deletePres()}>Yes</button>
                            <button onClick={() => setDeletePresPopup(false)}>No</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}


    </>;


}

export default Pres;