import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_PORT } from '../../backend.config.json';
import { StyledButton } from '../styles/styledComponents';

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

  return <StyledButton onClick={logout}>Logout</StyledButton>
}

export default Logout;