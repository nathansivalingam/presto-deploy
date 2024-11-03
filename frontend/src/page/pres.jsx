import React from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

const Pres = function ({ token }) {

    const params = useParams();

    return <>
        Hello Deck {params.presid}
    </>;
}

export default Pres;