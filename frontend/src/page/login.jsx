import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Login({ handleSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post('http://localhost:5005/admin/auth/login', {
      email: email,
      password: password,
    })
    .then( (response) => {
      handleSuccess(response.data.token);
    })
    .catch( (error) => {
      console.log(error.response.data.error);
    });
  }

  return (
    <>
      <h2>Login</h2>
      Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
      Password: <input type="text" value={password} onChange={e => setPassword(e.target.value)} /><br />

      <button onClick={login}>Login</button>
    </>
  )
}

export default Login