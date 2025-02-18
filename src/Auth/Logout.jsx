import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');  // Remove token
    history.push('/login');  // Redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
