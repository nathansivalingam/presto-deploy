import React, { useState } from 'react';
import { useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom';

import Register from './page/register';
import Login from './page/login';
import Logout from './component/logout';
import Dashboard from './page/dashboard';
import Pres from './page/pres';
import Landingpage from './page/landingpage';

function Router() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/dashboard');
  }

  React.useEffect(() => {
      if (token && ['/login', '/register', '/'].includes(location.pathname)) {
        navigate('/dashboard');
      } else if (!token && !['/login', '/register'].includes(location.pathname)) {
        navigate('/');
      }
  }, [token, location.pathname])

  return (
    <>
        <div>
          {token && (
            <>
              <Link to='/dashboard'>Dashboard</Link>
              <Logout token={token} setToken={setToken} />
            </>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/dashboard" element={<Dashboard token={token} />} />
          <Route path="/pres/:presid" element={<Pres />} />
          <Route path="/register" element={<Register handleSuccess={handleNewToken}/>} />
          <Route path="/login" element={<Login handleSuccess={handleNewToken}/>} />
        </Routes>
    </>
  )
}

export default Router