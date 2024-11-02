import React, { useState } from 'react';
import { BrowserRouter, Navigate, useLocation, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import Register from './page/register';
import Login from './page/login';
import Logout from './component/logout';
import Dashboard from './page/dashboard';

// const Homepage = <>a</>;

function Router() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const handleNewToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/dashboard');
  }

  React.useEffect(() => {
      if (token && ['/login', '/register'].includes(location.pathname)) {
        navigate('/dashboard');
      } else if (!token && !['/login', '/register'].includes(location.pathname)) {
        navigate('/login');
      }
  }, [token, location.pathname])

  return (
    <>
        <div>
          {token ? (
            <>
              <Link to='/dashboard'>Dashboard</Link>
              <Logout token={token} setToken={setToken} />
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
          <Route path="/dashboard" element={<Dashboard token={token} />} />
          <Route path="/deck/:deckid" element={<Deck />} />
          <Route path="/register" element={<Register token={token} handleSuccess={handleNewToken}/>} />
          <Route path="/login" element={<Login token={token} handleSuccess={handleNewToken}/>} />
        </Routes>
    </>
  )
}

export default Router