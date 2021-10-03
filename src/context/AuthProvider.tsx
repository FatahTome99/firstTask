 import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";

import { auth } from "../firebase"


export function useAuth() {
  return useContext(AuthContext)
}
export const AuthProvider : React.FC<{}> = ({ children }) =>  {

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

console.log("user  " +currentUser)
  function signup(email : string, password :string) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email : string, password : string) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    console.log("signout")
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
    // @ts-ignore
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])
  console.log("CurrentUser"+currentUser)


  return (
    <AuthContext.Provider value= {{currentUser , login , signup , logout}} >
      {!loading && children}

    </AuthContext.Provider>
  )
}