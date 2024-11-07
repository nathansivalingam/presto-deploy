import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurSlide, 
    PresPage,
    NewPresPopUpDiv,
    NewPresPopupStyle, 
    BackDeleteBtnPagePosStyle,
    YesNoBtnStyle, InputForLogReg } from '../styles/styledComponents';


const Pres = function ({ token, curStore, setStoreFn }) {
    
    const params = useParams();
    
    const [curSlideNum, setCurSlideNum] = React.useState(0);
    const [deletePresPopup, setDeletePresPopup] = React.useState(false);
    const [editTitlePopup, setEditTitlePopup] = React.useState(false);
    const [editThumbnailPopup, setEditThumbnailPopup] = React.useState(false);
    const [title, setTitle] = React.useState(((curStore.allPres)[params.presid])['title']);
    const [thumbnail, setThumbnail] = React.useState(((curStore.allPres)[params.presid])['thumbnail']);

    const navigate = useNavigate();

    const displayCurSlide = () => {
        return <CurSlide>This is the first slide = {curSlideNum}</CurSlide>
    }

    // This function is in charge of deleting the presentation
    const deletePres = () => {
        const newStore = {...curStore};
        const deletePresNum = params.presid;
        (newStore.allPres).splice([params.presid],1);
        setStoreFn(newStore);
        setDeletePresPopup(false);
        navigate('/dashboard');
    }
    const modifyPresDetails = () => {
        const newStore = {...curStore};
        ((newStore.allPres)[params.presid])['title'] = title;
        setStoreFn(newStore);
        setEditTitlePopup(false);
    }

    const  fileToDataUrl = (file) => {
        const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
        const valid = validFileTypes.find(type => type === file.type);
        // Bad data, let's walk away.
        if (!valid) {
            throw Error('provided file is not a png, jpg or jpeg image.');
        }
        
        const reader = new FileReader();
        const dataUrlPromise = new Promise((resolve,reject) => {
            reader.onerror = reject;
            reader.onload = () => resolve(reader.result);
        });
        reader.readAsDataURL(file);
        return dataUrlPromise;
    }

    const modifyPresThumbnail = () => {


    }

    return <>
        <BackDeleteBtnPagePosStyle>
            <div>{title}</div>
            <button onClick={() => setEditTitlePopup(true)}>Edit Title</button>
        </BackDeleteBtnPagePosStyle>
        <BackDeleteBtnPagePosStyle>
            <button onClick={() => navigate('/Dashboard')}>Back</button>
            <button onClick={() => setDeletePresPopup(true)}>Delete Presentation</button>
        </BackDeleteBtnPagePosStyle>
        <PresPage>
            {displayCurSlide()}
        </PresPage>

        {deletePresPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div>Are you sure?</div>
                        <YesNoBtnStyle>
                            <button onClick={() => deletePres()}>Yes</button>
                            <button onClick={() => setDeletePresPopup(false)}>No</button>
                        </YesNoBtnStyle>
                    </NewPresPopupStyle> 
                </NewPresPopUpDiv>
            </>
        )}

        {editThumbnailPopup && (
                <>
                    <NewPresPopUpDiv>
                        <NewPresPopupStyle>
                            <div>Select a Thumbnail:</div>
                            <div>
                                <InputForLogReg type="file" value={thumbnail} /><br />
                            </div>
                            <YesNoBtnStyle>
                                <button onClick={() => modifyPresThumbnail()}>Submit</button>
                                <button onClick={() => {
                                    setEditThumbnailPopup(false);
                                    setTitle((curStore.allPres)[params.presid]['title']);
                                    console.log((curStore.allPres)[params.presid]['title']);
                                }}>
                                    Cancel
                                </button>
                            </YesNoBtnStyle>
                        </NewPresPopupStyle> 
                    </NewPresPopUpDiv>
                </>
            )}

        {editTitlePopup && (
                <>
                    <NewPresPopUpDiv>
                        <NewPresPopupStyle>
                            <div>Enter new title:</div>
                            <div>
                                <InputForLogReg type="text" value={title} onChange={e => setTitle(e.target.value)} /><br />
                            </div>
                            <YesNoBtnStyle>
                                <button onClick={() => modifyPresDetails()}>Submit</button>
                                <button onClick={() => {
                                    setEditTitlePopup(false);
                                    setTitle((curStore.allPres)[params.presid]['title']);
                                    console.log((curStore.allPres)[params.presid]['title']);
                                }}>
                                    Cancel
                                </button>
                            </YesNoBtnStyle>
                        </NewPresPopupStyle> 
                    </NewPresPopUpDiv>
                </>
            )}
    </>;


}

export default Pres;