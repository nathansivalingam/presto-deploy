import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_PORT } from '../../backend.config.json';

const Logout = ({token, setToken}) => {
  const navigate = useNavigate();
  const logout = () => {
    axios.post(`http://localhost:${BACKEND_PORT}/admin/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then( (response) => {
      localStorage.removeItem('token');
      setToken(null);
      navigate('/');
    })
    .catch( (error) => {
      console.log(error.response.data.error);
    });
  }

  return <button onClick={logout}>Logout</button>
}

export default Logout;