import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom';
import { NavBar, NavBarBtn, GlobalBodyStyle } from './styles/styledComponents';
import { BACKEND_PORT } from '../backend.config.json';

import Register from './page/register';
import Login from './page/login';
import Logout from './component/logout';
import Dashboard from './page/dashboard';
import Pres from './page/pres';
import Landingpage from './page/landingpage';
import Edit from './page/edit';

function Router() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();
  const [store, setStore] = React.useState({});

  const setStoreAll = (newStore) => {
      axios.put(
          `http://localhost:${BACKEND_PORT}/store`,
          {
              store: newStore,
          },
          {
              headers: { Authorization: `Bearer ${token}` }
          }
      )
      .then( (response) => {
          setStore(newStore);
      })
      .catch( (error) => {
          console.log(error.response.data.store);
      })
  }

  React.useEffect(() => {
      if (token) {
          axios.get(`http://localhost:${BACKEND_PORT}/store`, {
              headers: { Authorization: `Bearer ${token}` }
          })
          .then( (response) => {
              setStore(response.data.store);
          })
          .catch( (error) => {
              console.log(error.response.data.error);
          });
      }
  }, [token]);

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
              <NavBar>
                <NavBarBtn>
                  <div>Presto</div>
                </NavBarBtn>
                <NavBarBtn>
                  <Logout token={token} setToken={setToken} />
                </NavBarBtn>
              </NavBar>
            </>
          )}
        </div>
        <GlobalBodyStyle/>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/dashboard" element={<Dashboard token={token} curStore={store} setStoreFn={setStoreAll} />} />
          <Route path="/pres/:presid" element={<Pres token={token} curStore={store} setStoreFn={setStoreAll} />} />
          <Route path="/register" element={<Register handleSuccess={handleNewToken}/>} />
          <Route path="/login" element={<Login handleSuccess={handleNewToken}/>} />
          <Route path="/pres/:presid/edit/:editid" element={<Edit token={token} curStore={store} setStoreFn={setStoreAll} />} />
        </Routes>
    </>
  )
}

export default Router