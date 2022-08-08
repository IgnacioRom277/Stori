import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes , Navigate, Route } from 'react-router-dom';
import Auth from './user/pages/Auth/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Recipient from './recipient/pages/Recipient';
import Newsletter from './newsletter/pages/Newsletter';
import SendNewsletter from './newsletter/pages/SendNewsletter/SendNewsletter';
import { AuthContext } from './shared/context/auth-context';
import ShowNewsletter from './newsletter/pages/ShowNewsletter/ShowNewsletter';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback(userid => {
    setIsLoggedIn(true);
    setUserId(userid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/newsletter" element={<Newsletter/>} exact></Route>
        <Route path="/recipients" element={<Recipient/>} exact></Route>
        <Route path="/send-newsletter" element={<SendNewsletter/>} exact></Route>
        <Route path="/show-newsletter" element={<ShowNewsletter/>} exact></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Auth/>} exact></Route>
        <Route path="*" element={<Auth/>}></Route>
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
