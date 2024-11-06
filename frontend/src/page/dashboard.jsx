import React from 'react';
import axios from 'axios';

const Dashboard = function({ token }) {
    
    const [store, setStore] = React.useState({});
    const [newPresPopup, setNewPresPopup] = React.useState(false);
    const [newPresName, setNewPresName] = React.useState('');

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
    
    const newPres = () => {
        setNewPresPopup(!newPresPopup);
        const newStore = {...store};
        if (!('allPres' in newStore)) {
            newStore['allPres'] = {};
        }

        newStore['allPres'][Object.keys(newStore['allPres']).length] = {
                "title": newPresName,
                "thumbnail": '',
                "description": '',
                "numSlides": 1,
                "Slides": {
                    "0": {},
                }
        };
        setStoreAll(newStore);
    }

    const showPresentations = (presentations) => {
        console.log(presentations)
        if (!presentations || Object.keys(presentations).length === 0) {
            return <p>No presentations available.</p>; 
        }
    
        return Object.entries(presentations).map(([key, presentation]) => (
            <div key={key} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                <h2>{presentation.title}</h2>
                <p>{presentation.description}</p>
            </div>
        ));
    }

    return <>
        {newPresPopup ? (
            <>
                <input type="text" value={newPresName} onChange={e => setNewPresName(e.target.value)} /><br />
                <button onClick={() => newPres()}>Create</button>
            </>
          ):(
            <>
                All Presentations<br />
                <button onClick={() => setNewPresPopup(!newPresPopup)}>New Presentation</button>
                {showPresentations(store['allPres'])}
            </>
          )}
    </>;
};

export default Dashboard