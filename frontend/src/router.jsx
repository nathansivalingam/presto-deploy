import React, { useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import Register from './page/register';
import Login from './page/login';
import Logout from './component/logout';

const Homepage = <>a</>;
const Dashboard = <>dashboard</>;

function Router() {

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

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

  if (token && )

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
          <Route path="/dashboard" element={Dashboard} />
          <Route path="/register" element={<Register handleSuccess={handleNewToken}/>} />
          <Route path="/login" element={<Login handleSuccess={handleNewToken}/>} />
        </Routes>
    </>
  )
}

export default Router