import './style.scss';
import React, { useEffect } from 'react';
import Parse from 'parse';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    // Initialize Parse
    Parse.initialize(
      'branch-cs-messaging-web-app',
      'N9IcW9EFc^WUjFbe6(!!L#uqvg^k33AD9LL!4LnPT+VhkPPqNk'
    );
    Parse.serverURL = 'http://localhost:1337/branch-cs-messaging-web-app';

    // Enable local data storage (optional)
    Parse.enableLocalDatastore(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chatroom" element={<Chatroom />} />
      </Routes>
    </Router>
  );
}

export default App;
