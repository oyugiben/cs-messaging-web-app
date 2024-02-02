import './style.scss';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Login from './pages/Login';

function App() {
  const { currentAgent, userLoading, userLoaded } = useContext(AuthContext);
  console.log('🚀 ~ App ~ currentAgent:', currentAgent);

  const isLoading = userLoading === true;
  console.log("🚀 ~ App ~ isLoading:", isLoading)
  const loggedIn = userLoading === false && currentAgent !== null && userLoaded === true;
  console.log("🚀 ~ App ~ loggedIn:", loggedIn)
  const loggedOut = userLoading === false && currentAgent === null && userLoaded === true;
  console.log("🚀 ~ App ~ loggedOut:", loggedOut)

  if (userLoading === true || userLoading === null) {
    // Loading state, you may want to display a loading spinner or message
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/chatroom" /> : <Login />} />
        <Route path="/chatroom" element={loggedIn ? <Chatroom /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
