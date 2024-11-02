import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <>
      <h2>Register</h2>a
      Email: <input type="text" value={email} onClick={e => setEmail(e.target.value)} /><br />
      Password: <input type="text" value={password} onClick={e => setPassword(e.target.value)} /><br />
      Name: <input type="text" value={name} onClick={e => setName(e.target.value)} /><br />
    </>
  )
}

export default App
