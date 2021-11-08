import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import SignUp from './compnents/signup/SignUp';
// import LogIn from './compnents/logIn/LogIn';
import { AuthProvider } from "../src/context/AuthProvider"
import DashBoard from './compnents/dashbord/DashBoard';
import PrivateRoute from './Routs/privateroutes';
import PublicRoute from './Routs/Publicroutes';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { ThemeProvider } from './context/ThemeProvider';

import common_ar from "./translations/ar/common.json";
import common_en from "./translations/en/common.json";
import i18next from 'i18next';
import Messages from './compnents/messages/Messages';

const SignUp = lazy(() => import('./compnents/signup/SignUp'));
const LogIn = lazy(() => import('./compnents/logIn/LogIn'));


i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    ar: {
      common: common_ar
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>

              <Switch>
                <PublicRoute path="/signup"><SignUp /></PublicRoute>
                <PublicRoute exact path={["/", "/login"]}><LogIn /></PublicRoute>
                <PrivateRoute path="/dashboard"> <DashBoard /> </PrivateRoute >
                {/* <PrivateRoute path="/chat"> <Messages /> </PrivateRoute > */}
              </Switch>
           
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
