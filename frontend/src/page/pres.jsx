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
    StyledButton,
    InvertStyledButton,
    StyledHeader,
    MainHeading,
    Subheading,
    StyledHr,
    SlideNumberStyle, 
    MainBody} from '../styles/styledComponents';
import Slide from '../component/slide'

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
        
        <StyledHeader>
            <Subheading>Details:</Subheading>
            <div style={{display: "flex", gap: '5px'}}>
                <div  style={{display: "flex", flexDirection: "column", alignItems: 'center', gap: "3px"}}>
                <ThumbnailStyle>
                    {thumbnail && <ThumbnailImg src={thumbnail}></ThumbnailImg>} 
                </ThumbnailStyle>
                
                </div>
                <div  style={{display: "flex", flexDirection: "column", alignItems: 'center', gap: "3px"}}>
                        <div style={{height: '50px'}}>
                            <MainBody>{title}</MainBody>
                        </div>
                        
                </div>
            </div>
        </StyledHeader>
        <BackDeleteBtnPagePosStyle>
            <InvertStyledButton onClick={() => navigate('/Dashboard')}>Back to Dashboard</InvertStyledButton>
            <InvertStyledButton onClick={() => setDeletePresPopup(true)}>Delete Presentation</InvertStyledButton>
            <InvertStyledButton onClick={() => setEditTitlePopup(true)}>Edit Title</InvertStyledButton>
            <InvertStyledButton onClick={() => setEditThumbnailPopup(true)}>Edit Thumbnail</InvertStyledButton>
        </BackDeleteBtnPagePosStyle>

        <PresPage>
            <Slide curStore={curStore} setStoreFn={setStoreFn} editable={false} curSlideNum={curSlideNum}/>
        </PresPage>
        <BackDeleteBtnPagePosStyle>
            <StyledButton onClick={() => navigate(`/Pres/${params.presid}/Edit/${curSlideNum}`)}>Edit Screen</StyledButton>
        </BackDeleteBtnPagePosStyle>
        <BackDeleteBtnPagePosStyle >
            {!(curSlideNum == 0) ? ( <StyledButton onClick={() => prevSlide()}> {'<'} </StyledButton>) : (<StyledButton style={{ opacity: 0.5 }}> {'<'} </StyledButton>)}
            <StyledButton onClick={() => createNewSlide()}>Create New Slide</StyledButton>
            <StyledButton onClick={() => deleteSlide()}>Delete Slide</StyledButton>
            {!(curSlideNum == (curSlidesCount - 1)) ? (<StyledButton onClick={() => nextSlide()}>{'>'}</StyledButton>) : (<StyledButton style={{ opacity: 0.5 }}> {'>'} </StyledButton>)}
        </BackDeleteBtnPagePosStyle>

        {deletePresPopup && (
            <>
                <NewPresPopUpDiv>
                    <NewPresPopupStyle>
                        <div>WARNING: Are you sure you want to delete Your Presentation?</div>
                        <YesNoBtnStyle>
                            <StyledButton onClick={() => deletePres()}>Yes</StyledButton>
                            <StyledButton onClick={() => setDeletePresPopup(false)}>No</StyledButton>
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
                                <StyledButton onClick={() => modifyPresThumbnail()}>Submit</StyledButton>
                                <StyledButton onClick={() => {
                                    setEditThumbnailPopup(false);
                                    setThumbnail((curStore.allPres)[params.presid]['thumbnail']);
                                }}>
                                    Cancel
                                </StyledButton>
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
                                <StyledButton onClick={() => modifyPresDetails()}>Submit</StyledButton>
                                <StyledButton onClick={() => {
                                    setEditTitlePopup(false);
                                    setTitle((curStore.allPres)[params.presid]['title']);
                                    console.log((curStore.allPres)[params.presid]['title']);
                                }}>
                                    Cancel
                                </StyledButton>
                            </YesNoBtnStyle>
                        </NewPresPopupStyle> 
                    </NewPresPopUpDiv>
                </>
            )}
    </>;


}

export default Pres;