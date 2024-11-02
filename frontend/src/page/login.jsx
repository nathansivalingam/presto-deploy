import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Box, Background, GlobalBodyStyle } from '../styles/styledComponents';


function Login({ token, handleSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const login = () => {
    axios.post('http://localhost:5005/admin/auth/login', {
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
      <GlobalBodyStyle/>
      <Background>
        <Box>
          <h2>Login</h2>
          <div>Email: </div>
          <div><input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br /></div>
          <div>Password: </div>
          <div><input type="text" value={password} onChange={e => setPassword(e.target.value)} /><br /></div>
          <div>{error && <div style={{color: 'red'}}>Error: {error} </div>}</div>
          <div><button onClick={login}>Login</button></div>
          <Link to='/register'>Register</Link>
        </Box>
      </Background>
    </>
  )
}

export default Login