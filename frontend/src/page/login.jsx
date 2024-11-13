import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Box, Background, InputForLogReg, LabelsForLogReg, Logo, StyledButton, MainHeading, MainBody } from '../styles/styledComponents';
import { BACKEND_PORT } from '../../backend.config.json';

function Login({ handleSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = () => {
    axios.post(`http://localhost:${BACKEND_PORT}/admin/auth/login`, {
      email: email,
      password: password,
    })
    .then( (response) => {
      handleSuccess(response.data.token);
      setError(null);
    })
    .catch( (error) => {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    });
  }

  return (
    <>
      <Background>
        <Box>
          <div><Logo>Presto</Logo></div>
          <MainBody>
            <MainHeading>Login</MainHeading>
            <LabelsForLogReg>Email: </LabelsForLogReg>
            <div><InputForLogReg type="text" data-testid="email-input" value={email} onChange={e => setEmail(e.target.value)} /><br /></div>
            <LabelsForLogReg>Password: </LabelsForLogReg>
            <div><InputForLogReg type="text" data-testid="password-input" value={password} onChange={e => setPassword(e.target.value)} /><br /></div>
            <div>{error && <div data-testid="error-message" style={{color: 'red'}}>Error: {error} </div>}</div>
            <div><StyledButton data-testid="login-btn" onClick={login}>Login</StyledButton></div>
            <Link to='/register'>Don't have an account? Register Here</Link>
          </MainBody>
        </Box>
      </Background>
    </>
  )
}

export default Login