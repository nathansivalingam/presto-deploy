import React from 'react';
import { useParams } from 'react-router-dom';
import { CurSlide, PresPage } from '../styles/styledComponents';

const Pres = function ({ token, curStore, setStoreFn }) {
    const [curSlideNum, setCurSlideNum] = React.useState(0);
    const params = useParams();
    //const newStore = {...curStore};
    //const firstSlide = newStore?.allPres?.[params.presid]?.slides?.[0];


    const displayCurSlide = () => {
        return <CurSlide>
                This is the firsts slide = {curSlideNum}
            </CurSlide>
    }

    
    return <>
        <PresPage>
            {displayCurSlide()}
        </PresPage>

        <div>
            2
        </div>
    </>;


}

export default Pres;