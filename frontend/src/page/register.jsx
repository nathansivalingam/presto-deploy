import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Box, Background, InputForLogReg, LabelsForLogReg, Logo, StyledButton, MainBody, MainHeading } from '../styles/styledComponents';
import { BACKEND_PORT } from '../../backend.config.json';

function Register({ handleSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const register = () => {
    console.log(email, password, confPassword, name);
    if (!(email.includes('@'))){
      setError("All emails must contain an '@' symbol");
      return;
    } else if (confPassword !== password){
      setError("Passwords do NOT match");
      return;
    }
    axios.post(`http://localhost:${BACKEND_PORT}/admin/auth/register`, {
      email: email,
      password: password,
      name: name,
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
            <MainHeading>Register</MainHeading>
            <LabelsForLogReg>Email:</LabelsForLogReg>
            <div><InputForLogReg type="text" data-testid="email-input" value={email} onChange={e => setEmail(e.target.value)} /><br /></div>
            <LabelsForLogReg>Password: </LabelsForLogReg>
            <div><InputForLogReg type="text" data-testid="password-input" value={password} onChange={e => setPassword(e.target.value)} /><br /></div>
            <LabelsForLogReg>Confirm Password:</LabelsForLogReg>
            <div><InputForLogReg type="text" data-testid="confirm-password-input" value={confPassword} onChange={e => setConfPassword(e.target.value)} /><br /></div>
            <LabelsForLogReg>Name: </LabelsForLogReg>
            <div><InputForLogReg type="text" data-testid="name-input" value={name} onChange={e => setName(e.target.value)} /><br /></div>
            <div>{error && <div style={{color: 'red'}}>Error: {error} </div>}</div>
            <div><StyledButton data-testid="register-btn" onClick={register}>Register</StyledButton></div>
            <Link to='/login'>Already have an account? Login Here</Link>
          </MainBody>
        </Box>
      </Background>
    </>
  )
}

export default Register