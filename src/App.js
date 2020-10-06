import React, { useState } from 'react';
import { createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from './Component/Authentication/Login';
import EventTask from './Component/EventTask/EventTask';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import RegVolunter from './Component/RegVolunter/RegVolunter';
import './Style.scss';
export const UserContext = createContext();

function App() {
  const [loggedinUser, setLoggedinUser] = useState({});
  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
      <Router>
        <Switch>
          <Route exact path="/home">
            <Header></Header>
            <Home />
          </Route>

          <Route exact path="/">
            <Header></Header>
            <Home />
          </Route>
          <PrivateRoute path="/registration/:taksID">
            <RegVolunter></RegVolunter>
          </PrivateRoute>

          <PrivateRoute path="/event">
            <Header></Header>
            <EventTask></EventTask>
          </PrivateRoute>

          <Route path="/login">
            <SignUp></SignUp>
          </Route>

          <Route path="*">
            {/* not found page */}
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>      
  );  
}

export default App;
