import React from 'react';
import axios from 'axios';

const Dashboard = function({ token }) {
    
    const [store, setStore] = React.useState({});
    
    const setStoreAll = (newStore) => {
        axios.put(
            'http://localhost:5005/store',
            {
                store: newStore,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        .then( (response) => {
            setStore(newStore);
        })
        .catch( (error) => {
            console.log(error.response.data.store);
        })
    }

    React.useEffect(() => {
        if (token) {
            axios.get('http://localhost:5005/store', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then( (response) => {
                setStore(response.data.store);
            })
            .catch( (error) => {
                console.log(error.response.data.error);
            });
        }
    }, [token]);
    
    const newDeck = () => {
        const newStore = {...store};
        if (!('decks' in newStore)) {
            newStore['decks'] = [];
        }
        newStore['decks'].push({
            title: 'Hayden sucks',
        })
        setStoreAll(newStore);
    }

    return <>
        ALL YOUR STUFF!<br />
        <button onClick={newDeck}>New deck</button>
        {JSON.stringify(store)}
    </>;
};

export default Dashboard