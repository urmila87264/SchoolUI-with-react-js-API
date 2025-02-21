import { useState } from 'react';
import './App.css';
import Registration from './Auth/Reg';
import Login from './Auth/Login';
import Dashboard from './Auth/adminDashBoard';
import PrivateRoute from './Auth/PrivateRoute';
import ErrorBoundary from "./errorBoundries";
// import Test from './Testing';
import  { withExtraInfo, withLogger }  from './Hoc'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundry from './errorBoundries';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const MyComponent=(props)=>{
    return(<div>
      {props.extraInfo ||"Default Info"}
    </div>)

  };
   const EnhancedComponent =withExtraInfo(withLogger(MyComponent))

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
      {/* <Test/> */}
      <ErrorBoundry>
      <EnhancedComponent />
      </ErrorBoundry>
      
    </Router>
    
  );
}

export default App;
