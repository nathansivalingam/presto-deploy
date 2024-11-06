import styled, { createGlobalStyle } from 'styled-components';


export const Box = styled.div(() => ({
    width: '400px',
    maxHeight: '300px',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '35px',
    display:'flex',
    flexDirection:'column',
    gap: '3px',
    marginTop: '100px',
    fontFamily: 'Arial',
}));

export const Background = styled.div(() => ({
    backgroundColor: '#d9d9d9',
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
    }
`;

// Dashboard Styles
export const NavBar = styled.div(() => ({
    backgroundColor: '#D1EEFC',
    display: 'flex',
    height: '40px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
}));

export const NavBarBtn = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
}));

export const NewPresPopUpDiv = styled.div(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

export const NewPresPopupStyle = styled.div(() => ({
    border: '10px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '100px',
    borderRadius: '10px',
    padding: '20px',
    gap: '10px',
    borderWidth: '1px',
    borderColor: 'black',
    borderStyle: 'solid',
}));