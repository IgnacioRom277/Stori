import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './user/pages/Auth/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return (
    <React.Fragment>
      <Router>
        <MainNavigation />
        <Auth />
      </Router>
    </React.Fragment>
  );
}

export default App;
