import React from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

const Deck = function ({ token }) {

    const params = useParams();

    return <>
        Hello Deck {params.deckid}
    </>;
}

export default Deck;