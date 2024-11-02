import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Navigate, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Register from './page/register';
import Login from './page/login';

const Homepage = <>a</>;
const Dashboard = <>dashboard</>;

function App() {

  const [token, setToken] = useState(null);
  console.log(token);

  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <>
      <BrowserRouter>
        <div>
          {token ? (
            <>
              <Link to='/dashboard'>Dashboard</Link>
            </>
          ) : (
            <>
              <Link to='/register'>Register</Link>
              &nbsp;|&nbsp;
              <Link to='/login'>Login</Link>
            </>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="register" />} />
          <Route path="/dashboard" element={Dashboard} />
          <Route path="/register" element={<Register setTokenFn={setToken}/>} />
          <Route path="/login" element={<Login setTokenFn={setToken}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
