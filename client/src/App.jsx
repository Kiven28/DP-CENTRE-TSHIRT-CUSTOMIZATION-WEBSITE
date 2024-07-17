// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Admin from './pages/Admin';
import Tutorial from './pages/Tutorial';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import state from './store';
import { useSnapshot } from 'valtio';

function App() {
  const snap = useSnapshot(state);

  const handleLoginSuccess = () => {
    state.isAuthenticated = true;
  };

  return (
    <BrowserRouter>
      <main className="app transition-all ease-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/admin" element={snap.isAuthenticated ? <Admin /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
