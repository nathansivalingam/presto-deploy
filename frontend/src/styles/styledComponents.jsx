import styled, { createGlobalStyle } from 'styled-components';


export const Box = styled.div(() => ({
    width: '400px',
    maxHeight: '400px',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px 35px',
    display:'flex',
    flexDirection:'column',
    gap: '3px',
    marginTop: '100px',
    fontFamily: 'Arial',
    border: "2px solid #4A628A",
    color: "#4A628A",
    alignItems: "center"
}));

export const Background = styled.div(() => ({
    backgroundColor: '#D1EEFC',
    textAlign: 'center',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
}));


export const InputForLogReg = styled.input(() => ({
    width: '100%',

}));

export const LabelsForLogReg = styled.div(() => ({
    textAlign: 'left',
}));

export const GlobalBodyStyle = createGlobalStyle`
    body{
        margin: 0px;
        font-family: 'Arial';
        color: '#4A628A';
        background-color: 'black';

    }
`;

// Dashboard Styles


export const NavBarBtn = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
}));

export const NewPresPopUpDiv = styled.div(() => ({
    
    display: 'flex',
    justifyContent: 'center',
}));

export const NewPresPopupStyle = styled.div(({darkMode}) => ({
    border: '10px',
    backgroundColor:darkMode ? "#1a1a1a": "white",
    color: '#4A628A',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: '70%',
    maxWidth: '400px',
    justifyContent: 'center',
    alignItems: 'center',
    top: '100px',
    borderRadius: '10px',
    padding: '20px',
    gap: '10px',
    borderWidth: '2px',
    borderColor: '#4A628A',
    borderStyle: 'solid',
    zIndex: '1',
}));



export const CodeInputTextArea = styled.textarea(() => ({
    width: '100%',
}))

export const DashboardCardStyleDiv = styled.div(({darkMode}) => ({
    border: "1px solid #4A628A",
    color: "#4A628A",
    padding: "10px",
    display: 'flex',
    height: '100px',
    width: '200px',
    flexDirection: 'column',
    borderRadius: '10px',
    backgroundColor: darkMode ? "#1a1a1a":"white",

    '@media (min-width: 750px)': {
        height: '150px',
        width: '300px',
    }
}));

export const DashboardCardTopHalf = styled.div(() => ({
    display: 'flex',
    flexDirection: 'row',
}));

export const ShowPresentationList = styled.div(() => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
    margin: '20px',
    justifyContent: 'center',
}));

export const ThumbnailStyle = styled.div(() => ({
    backgroundColor: 'lightgrey',
    width: '50px',
    height: '50px',
    marginRight: '10px',
}));

export const ThumbnailImg = styled.img(() => ({
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '100%',
    marginRight: '10px',
}));

export const TrailOff = styled.div(() => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '200px',
}));

export const TrailOffWrap = styled.div(() => ({
    whiteSpace: 'wrap',
    overflow: 'hidden',
    maxWidth: '200px',
    wordBreak: 'break-word',
}));

// Current Presentation
export const CurSlide = styled.div(({darkMode}) => ({
    height: '100%',
    width: '80%',
    display: 'flex',
    borderWidth: '2px',
    borderColor: '#4A628A',
    borderStyle: 'solid',
    backgroundColor: darkMode ? "#333333" : "white",
    position: 'relative',
    overflow: 'hidden',
}));

export const SlideNumberStyle = styled.div(() => ({
    display: 'flex',
    justifyContent: 'center', // Horizontally center the text
    alignItems: 'center',     // Vertically center the text
    width: '50px',
    height: '50px',
    backgroundColor: '#D1EEFC',
    position: 'absolute', // Absolute positioning
    bottom: '0', // Position at the bottom
    left: '0',   // Position at the left
    fontSize: '1em',
}));

export const PresPage = styled.div(() => ({
    display: 'flex',
    justifyContent: 'center',
    height: '400px',
    marginTop: '10px',
    '@media (min-width: 750px)': {
        height: '700px',    // Increase height when screen width is above 800px
    // Increase width when screen width is above 800px
    }
}));

export const PresentationBtnHeadingStyle = styled.div(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
    alignItems: 'center',
}));

export const BackDeleteBtnPagePosStyle = styled.div(() => ({
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const YesNoBtnStyle = styled.div(() => ({
    display: 'flex',
    gap: '10px',
}));


export const StyledButton = styled.button(() => ({
    backgroundColor: '#4A628A',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',

    '&:hover': {
        backgroundColor: 'deepskyblue',
    },
}));

export const InvertStyledButton = styled.button(() => ({
    backgroundColor: 'white',
    color: '#4A628A',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    border: "1px solid #4A628A",

    '&:hover': {
        backgroundColor: 'deepskyblue',
    },
}));

export const StyledHr = styled.hr(() => ({
    border: 'none',
    borderTop: '2px solid #7AB2D3',
    margin: '10px 80px',
    width: 'auto',
}));

export const Subheading = styled.h3(() => ({
    fontSize: '1.5em',
    fontWeight: '600',
    margin: '5px 0',
    color: '#4A628A',
    textAlign: 'left',
    textTransform: 'uppercase',
}));

export const Logo = styled.h3(({darkMode}) => ({
    fontSize: '1.5em',
    fontWeight: '600',
    margin: '5px 0',
    color: '#4A628A',
    textAlign: 'left',
    textTransform: 'uppercase',
    backgroundColor: darkMode? '#0a0a0a':'white', 
    borderRadius:'5px',
    padding:'5px',
    border: "2px solid #4A628A",
    width: "98px",
    marginBottom: "0px",
}));

export const MainHeading = styled.h2(() => ({
    fontWeight: '600',
    margin: '5px 0',
    color: '#4A628A',
    textTransform: 'uppercase',
    backgroundColor: 'white', 
    borderRadius:'5px',
    padding:'5px',
    width: "98px",
    marginBottom: "0px",
    textDecoration: "underline"
}));

export const MainBody = styled.div(({darkMode}) => ({
    fontWeight: '600',
    margin: '5px 0',
    color: '#4A628A',
    textTransform: 'uppercase',
    backgroundColor: darkMode ? "#0a0a0a" : "white",
    borderRadius:'5px',
    padding:'5px',
    marginBottom: "0px",
    display: "flex",
    flexDirection: 'column',
    gap: "7px"
}));
export const StyledHeader = styled.div(({darkMode}) => ({
    backgroundColor: darkMode ? "#0a0a0a" : "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    padding: "4px 0px",
}));

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bodyBg || '#ffffff'};
    color: ${(props) => props.theme.textColor || '#000000'};
    margin: 0;
    font-family: Arial, sans-serif;
    transition: background-color 0.3s ease;
  }
`;

export const DarkGlobalBodyStyle = createGlobalStyle`
    body{
        margin: 0px;
        font-family: 'Arial';
        color: 'white';
        backgroundColour:'#4A628A';
    }
`;
export const BackgroundMainDiv = styled.div`
  background-color: ${(props) => (props.darkMode ? '#0a0a0a' : '#ffffff')};
  transition: background-color 0.3s ease;
  min-height: 100vh;
`;

export const NavBar = styled.div(({darkMode}) => ({
    backgroundColor: darkMode ? '#121212' : '#D1EEFC',
    display: 'flex',
    height: '60px',
    
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '0px 30px'
}));