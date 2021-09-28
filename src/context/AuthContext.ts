import React from "react";
import firebase from "../firebase";

export const AuthContext = React.createContext({
    currentUser: null,

    login: (email: string, password: string) => { },
    signup: (email: string, password: string) => { },
    logout: () => { }
});