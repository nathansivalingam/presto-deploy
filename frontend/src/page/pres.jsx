import React from 'react';
import { useParams } from 'react-router-dom';

const Pres = function ({ token }) {

    const params = useParams();
    console.log(params);
    return <>
        Hello Deck {params.presid}
    </>;


}

export default Pres;