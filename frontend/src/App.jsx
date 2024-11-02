import { useState } from 'react';
import { axios } from 'axios';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const register = () => {
    console.log(email, password, name);
    axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <h2>Register</h2>
      Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
      Password: <input type="text" value={password} onChange={e => setPassword(e.target.value)} /><br />
      Name: <input type="text" value={name} onChange={e => setName(e.target.value)} /><br />

      <button onClick={register}>Register</button>
    </>
  )
}

export default App
