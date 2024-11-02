import styled, { createGlobalStyle } from 'styled-components';


export const Box = styled.div(() => ({
    width: '400px',
    maxHeight: '300px',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
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

export const GlobalBodyStyle = createGlobalStyle`
    body{
        margin: 0px;
    }
`;
