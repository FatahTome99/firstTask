import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignUp from './compnents/signup/SignUp';
import App from './compnents/App';
import LogIn from './compnents/logIn/LogIn';
import { AuthProvider } from "../src/context/AuthProvider"
import DashBoard from './compnents/dashbord/DashBoard';
import PrivateRoute from './privateroutes';

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Switch>
          
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/login" component={LogIn}></Route>

          {/* <Route path="/dhashBoard" component={DashBoard}></Route> */}

          <PrivateRoute path="/dashboard"> <DashBoard/></PrivateRoute>
          


        </Switch>
      </AuthProvider>
    </Router>
    {/* <LogIn /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
