import './style.scss';
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Login from './pages/Login';

function App() {
  const { currentAgent } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={currentAgent ? <Navigate to="/chatroom" /> : <Login />}
        />
        <Route
          path="/chatroom"
          element={currentAgent ? <Chatroom /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
