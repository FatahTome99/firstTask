import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext";


const PrivateRoute: React.FC<RouteProps> = (props) => {
  return (
    <div>
      <Route {...props}>
        <AuthContext.Consumer>
          {(value) =>
            value.currentUser? props.children : <Redirect to="/login" />
          }
        </AuthContext.Consumer>
      </Route>
    </div>
  );
};

export default PrivateRoute;