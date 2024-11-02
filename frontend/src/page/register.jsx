import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Box, Background, GlobalBodyStyle } from '../styles/styledComponents';

function Register({ token, handleSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const register = () => {
    console.log(email, password, confPassword, name);
    if (confPassword !== password){
      setError("Passwords do NOT match");
      return;
    }
    axios.post('http://localhost:5005/admin/auth/register', {
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
      <GlobalBodyStyle/>
      <Background>
        <Box>
          <h2>Register</h2>
          <div>Email:</div>
          <div><input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br /></div>
          <div>Password: </div>
          <div><input type="text" value={password} onChange={e => setPassword(e.target.value)} /><br /></div>
          <div>Confirm Password:</div>
          <div><input type="text" value={confPassword} onChange={e => setConfPassword(e.target.value)} /><br /></div>
          <div>Name: </div>
          <div><input type="text" value={name} onChange={e => setName(e.target.value)} /><br /></div>
          <div>{error && <div style={{color: 'red'}}>Error: {error} </div>}</div>
          <div><button onClick={register}>Register</button></div>
          <Link to='/login'>Login</Link>
        </Box>
      </Background>
    </>
  )
}

export default Register