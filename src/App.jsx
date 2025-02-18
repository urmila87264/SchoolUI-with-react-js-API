import { useState } from 'react';
import './App.css';
import Registration from './Auth/Reg';
import Login from './Auth/Login';
import Dashboard from './Auth/adminDashBoard';
import PrivateRoute from './Auth/PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Registration onRegister={() => setIsRegistered(true)} />}
        />
        <Route
          path="/register"
          element={<Registration onRegister={() => setIsRegistered(true)} />}
        />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<Dashboard />} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
