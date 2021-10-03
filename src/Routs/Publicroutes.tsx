import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext";


const PublicRoute: React.FC<RouteProps> = (props) => {
  return (
    <div>
      <Route {...props}>
        <AuthContext.Consumer>
          {(value) =>
            value.currentUser!=null? <Redirect to="/dashboard" /> : props.children 
          }
        </AuthContext.Consumer>
      </Route>
    </div>
  );
};

export default PublicRoute;