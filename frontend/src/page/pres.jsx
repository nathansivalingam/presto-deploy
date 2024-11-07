import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurSlide, PresPage, NewPresPopUpDiv, NewPresPopupStyle } from '../styles/styledComponents';


const Pres = function ({ token, curStore, setStoreFn }) {
    const [curSlideNum, setCurSlideNum] = React.useState(0);
    const [deletePresPopup, setDeletePresPopup] = React.useState(false);
    const params = useParams();
    //const newStore = {...curStore};
    //const firstSlide = newStore?.allPres?.[params.presid]?.slides?.[0];
    const navigate = useNavigate();

    const displayCurSlide = () => {
        return <CurSlide>
                This is the firsts slide = {curSlideNum}
            </CurSlide>
    }

    const deletePres = () => {



        setDeletePresPopup(false);
        navigate('/dashboard');
    }
    
    return <>
        <button onClick={() => navigate('/Dashboard')}>Back</button>
        <button onClick={() => setDeletePresPopup(true)}>Delete Presentation</button>
        <PresPage>
            {displayCurSlide()}
        </PresPage>

        <div>
            2
        </div>

        {deletePresPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div>
                            Are you sure?
                        </div>
                        <div>
                            <button onClick={() => deletePres()}>Yes</button>
                            <button onClick={() => setDeletePresPopup(false)}>No</button>
                        </div>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}


    </>;


}

export default Pres;