import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NewPresPopupStyle, NewPresPopUpDiv, DashboardCardStyleDiv, ShowPresentationList, ThumbnailStyle, DashboardCardTopHalf, TrailOff, TrailOffWrap } from '../styles/styledComponents';

const Dashboard = function({ token }) {
    
    const [store, setStore] = React.useState({});
    const [newPresPopup, setNewPresPopup] = React.useState(false);
    const [newPresName, setNewPresName] = React.useState('');
    const navigate = useNavigate();

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
            <div key={key}>
                <DashboardCardStyleDiv onClick={() => {navigate(`/pres/${key}`)}}>
                    <DashboardCardTopHalf>
                        <ThumbnailStyle>
                            {presentation.thumbnail}
                        </ThumbnailStyle>
                        <TrailOff>
                            <div>Name: {presentation.title}</div>
                            <div>No. Slides: {presentation.numSlides}</div>
                        </TrailOff>
                    </DashboardCardTopHalf>
                    <TrailOffWrap>
                        Description: {presentation.description}
                    </TrailOffWrap>
                </DashboardCardStyleDiv>
            </div>
        ));
    }

    return <>
        <>
            <br />
            <div>
                <button onClick={() => setNewPresPopup(!newPresPopup)}>New Presentation</button>
            </div>
            All Presentations
            <ShowPresentationList>
                {showPresentations(store['allPres'])}
            </ShowPresentationList>
        </>
        {newPresPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div>
                            New presentation name:
                        </div>
                        <div>
                            <input type="text" value={newPresName} onChange={e => setNewPresName(e.target.value)} /><br />
                        </div>
                        <div>
                            <button onClick={() => newPres()}>Create</button>
                        </div>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}
            
          
    </>;
};

export default Dashboard