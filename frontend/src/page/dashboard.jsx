import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewPresPopupStyle, 
    NewPresPopUpDiv, 
    DashboardCardStyleDiv, 
    ShowPresentationList, 
    ThumbnailStyle, 
    DashboardCardTopHalf, 
    TrailOff, 
    TrailOffWrap,
    PresentationBtnHeadingStyle, ThumbnailImg } from '../styles/styledComponents';

const Dashboard = function({ token, curStore, setStoreFn }) {
    
    const [newPresPopup, setNewPresPopup] = React.useState(false);
    const [newPresName, setNewPresName] = React.useState('');
    const navigate = useNavigate();
    
    const newPres = () => {
        setNewPresPopup(!newPresPopup);
        const newStore = {...curStore};
        if (!('allPres' in newStore)) {
            newStore['allPres'] = {};
        }

        newStore['allPres'][Object.keys(newStore['allPres']).length] = {
                "title": newPresName,
                "thumbnail": '',
                "description": '',
                "numSlides": 1,
                "slides": {
                    "0": {},
                }
        };
        setStoreFn(newStore);
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
                            {presentation.thumbnail && <ThumbnailImg src={presentation.thumbnail}></ThumbnailImg>}   
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
            <PresentationBtnHeadingStyle>
                <div>
                    <button onClick={() => setNewPresPopup(!newPresPopup)}>New Presentation</button>
                </div>
                <div>All Presentations</div>
            </PresentationBtnHeadingStyle>
            <ShowPresentationList>
                {showPresentations(curStore['allPres'])}
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