import React from 'react';
import { useParams } from 'react-router-dom';
import { CurSlide, PresPage } from '../styles/styledComponents';

const Pres = function ({ token, curStore, setStoreFn }) {

    const params = useParams();
    const newStore = {...curStore};
    const firstSlide = newStore?.allPres?.[params.presid]?.slides?.[0];

    return <>
        <PresPage>
            <CurSlide>
                This is the first slide = {firstSlide}
            </CurSlide>
        </PresPage>
    </>;


}

export default Pres;