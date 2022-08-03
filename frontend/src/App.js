import React from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Router>
        <MainNavigation />
        <h1>React App</h1>
      </Router>
    </React.Fragment>
  );
}

export default App;
