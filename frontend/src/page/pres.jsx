import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurSlide, 
    PresPage,
    NewPresPopUpDiv,
    NewPresPopupStyle, 
    BackDeleteBtnPagePosStyle,
    YesNoBtnStyle, InputForLogReg, ThumbnailStyle, ThumbnailImg } from '../styles/styledComponents';


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

    const  fileToDataUrl = (event) => {
        const file = event.target.files[0];
        const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
        const valid = validFileTypes.includes(file.type);
        // // Bad data, let's walk away.
        if (!valid) {
             throw Error('provided file is not a png, jpg or jpeg image.');
         }
        
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setThumbnail(reader.result); // Set the Data URL as the thumbnail
            };
            reader.readAsDataURL(file); // Convert file to Data URL
        }
    }

    const modifyPresThumbnail = () => {
        const newStore = {...curStore};
        ((newStore.allPres)[params.presid])['thumbnail'] = (thumbnail);
        setStoreFn(newStore);
        setEditThumbnailPopup(false);
    }

    const createNewSlide = () => {
        const newStore = {...curStore};
        console.log(newStore.allPres)
        console.log(Object.keys(newStore['allPres'][params.presid]['slides']).length);
        //((newStore.allPres)[params.presid])['title'] = title;
        newStore['allPres'][params.presid]['slides'][Object.keys(newStore['allPres'][params.presid]['slides']).length] = {
                'content' : {},
        };
        console.log(newStore.allPres)
        setStoreFn(newStore);
    }

    const deleteSlide = () => {
        const newStore = {...curStore};
        console.log(newStore.allPres)
        console.log(Object.keys(newStore['allPres'][params.presid]['slides']).length);
        //((newStore.allPres)[params.presid])['title'] = title;
        newStore['allPres'][params.presid]['slides'][Object.keys(newStore['allPres'][params.presid]['slides']).length] = {
                'content' : {},
        };
        console.log(newStore.allPres)
        setStoreFn(newStore);
    }

    


    return <>
        <BackDeleteBtnPagePosStyle>
            <div>{title}</div>
            <button onClick={() => setEditTitlePopup(true)}>Edit Title</button>
        </BackDeleteBtnPagePosStyle>
        <BackDeleteBtnPagePosStyle>
            <ThumbnailStyle>
                {thumbnail && <ThumbnailImg src={thumbnail}></ThumbnailImg>} 
            </ThumbnailStyle>
            <button onClick={() => setEditThumbnailPopup(true)}>Edit Thumbnail</button>
        </BackDeleteBtnPagePosStyle>
        <BackDeleteBtnPagePosStyle>
            <button onClick={() => navigate('/Dashboard')}>Back</button>
            <button onClick={() => setDeletePresPopup(true)}>Delete Presentation</button>
        </BackDeleteBtnPagePosStyle>
        <PresPage>
            {displayCurSlide()}
        </PresPage>

        <BackDeleteBtnPagePosStyle>
            <button onClick={() => {}}> Prev Slide. </button>
            <button onClick={() => {}}>Next Slide.</button>
            <button onClick={() => createNewSlide()}>New Slide</button>
            <button onClick={() => deleteSlide()}>Delete Slide</button>
        </BackDeleteBtnPagePosStyle>

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
                                <input type="file" onChange={fileToDataUrl}/><br />
                            </div>
                            <YesNoBtnStyle>
                                <button onClick={() => modifyPresThumbnail()}>Submit</button>
                                <button onClick={() => {
                                    setEditThumbnailPopup(false);
                                    setThumbnail((curStore.allPres)[params.presid]['thumbnail']);
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