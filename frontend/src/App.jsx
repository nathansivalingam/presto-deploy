import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Register from './page/register';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Link to='/register'>Register</Link>
          &nbsp;|&nbsp;
          <Link to='/login'>Login</Link>
        </div>
        <Routes>
          <Route path="/" element={Homepage} />
          <Route path="/register" element={Register} />
          <Route path="/login" element={Login} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
