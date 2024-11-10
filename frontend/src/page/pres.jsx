import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurSlide, 
    PresPage,
    NewPresPopUpDiv,
    NewPresPopupStyle, 
    BackDeleteBtnPagePosStyle,
    YesNoBtnStyle, 
    InputForLogReg, 
    ThumbnailStyle, 
    ThumbnailImg, 
    SlideNumberStyle } from '../styles/styledComponents';


const Pres = function ({ token, curStore, setStoreFn }) {
    
    const params = useParams();
    
    const [curSlidesCount, setCurSlidesCount] = React.useState(((curStore.allPres)[params.presid])['numSlides']);
    const [curSlideNum, setCurSlideNum] = React.useState(0);
    const [deletePresPopup, setDeletePresPopup] = React.useState(false);
    const [editTitlePopup, setEditTitlePopup] = React.useState(false);
    const [editThumbnailPopup, setEditThumbnailPopup] = React.useState(false);
    const [title, setTitle] = React.useState(((curStore.allPres)[params.presid])['title']);
    const [thumbnail, setThumbnail] = React.useState(((curStore.allPres)[params.presid])['thumbnail']);

    const navigate = useNavigate();

    const displayCurSlide = () => {
        return <>
            <CurSlide>
                <SlideNumberStyle>
                    {curSlideNum + 1}
                </SlideNumberStyle>
            </CurSlide>
        </>
    }

    // This function is in charge of deleting the presentation
    const deletePres = () => {
        const newStore = {...curStore};
        const deletePresNum = params.presid;
        delete newStore.allPres[params.presid];
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
        newStore.allPres[params.presid].slides.push([]);
        newStore.allPres[params.presid]['numSlides'] +=1;
        console.log(newStore.allPres);
        setStoreFn(newStore);
        setCurSlidesCount(curSlidesCount + 1);
        
    }

    const deleteSlide = () => {
        
        if (curSlidesCount === 1) {
            setDeletePresPopup(true);
            return;
        } 
        
        const newStore = {...curStore};
        console.log(newStore.allPres)
        console.log(Object.keys(newStore['allPres'][params.presid]['slides']).length);
        
        newStore.allPres[params.presid].slides.splice(curSlideNum, 1);
        newStore.allPres[params.presid]['numSlides'] -=1;
        console.log(newStore.allPres);
        setStoreFn(newStore);
        setCurSlidesCount(curSlidesCount - 1);
        
        if (curSlideNum !== 0){
            setCurSlideNum(curSlideNum - 1);
        }
    }

    const nextSlide = () => {
        setCurSlideNum(curSlideNum + 1);
    }
    const prevSlide = () => {
        setCurSlideNum(curSlideNum - 1);
    }

    React.useEffect(() => {
        const handleArrowKeyPres = (e) => {
            if (e.key === 'ArrowLeft' && !(curSlideNum == 0)) {
                prevSlide();
            } else if (e.key === 'ArrowRight' && !(curSlideNum == (curSlidesCount - 1))) {
                nextSlide();
            }
        }
        window.addEventListener('keydown', handleArrowKeyPres);
        return () => {
          window.removeEventListener('keydown', handleArrowKeyPres);
        };
      }, [curSlideNum]);


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
            <button onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
            <button onClick={() => setDeletePresPopup(true)}>Delete Presentation</button>
        </BackDeleteBtnPagePosStyle>
        <PresPage>
            {displayCurSlide()}
        </PresPage>
        <BackDeleteBtnPagePosStyle>
            <button onClick={() => navigate(`/Pres/${params.presid}/Edit/${curSlideNum}`)}>Edit Screen</button>
        </BackDeleteBtnPagePosStyle>
        <BackDeleteBtnPagePosStyle >
            {!(curSlideNum == 0) && <button onClick={() => prevSlide()}> {'<'} </button>}
            <button onClick={() => createNewSlide()}>Create New Slide</button>
            <button onClick={() => deleteSlide()}>Delete Slide</button>
            {!(curSlideNum == (curSlidesCount - 1)) && <button onClick={() => nextSlide()}>{'>'}</button>}
        </BackDeleteBtnPagePosStyle>

        {deletePresPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div>WARNING: Are you sure you want to delete Your Presentation?</div>
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