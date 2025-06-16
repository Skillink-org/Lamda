import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { UserProvider } from './context/UserContext';
import './styles/globals.scss';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Layout />
      </UserProvider>
    </Router>
  );
};

export default App;