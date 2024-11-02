import styled from 'styled-components';


export const Box = styled.div(() => ({
    maxWidth: '400px',
    maxHeight: '200px',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    display:'flex',
    flexDirection:'column',
    gap: '3px',
    marginTop: '100px',
}));

export const Background = styled.div(() => ({
    backgroundColor: '#d9d9d9',
    textAlign: 'center',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    height: '100vw',
}));

// export default LoginRegisterBox;