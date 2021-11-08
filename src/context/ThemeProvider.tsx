import React, { useContext, useState, useEffect } from "react"
import { ThemeContext } from "../context/ThemeContext";

import { auth, firebaseAnalytics } from "../firebase"

export function useTheme() {
  return useContext(ThemeContext)
}
export const ThemeProvider : React.FC<{}> = ({ children }) =>  {

  const [Theme, setTheme] = useState('light')

  function ChangeTheme() {
    console.log("hi hi theme")
      if(Theme=='light'){
        firebaseAnalytics.logEvent("Change_Theme" , {'Theme' :'dark'})
        setTheme('dark');
        console.log('hi theme')

      }
     else{
        setTheme('light')
        firebaseAnalytics.logEvent("Change_Theme" , {'Theme' :'light'})

      }
  }

  return (
    <ThemeContext.Provider value= {{Theme, ChangeTheme}} >
      {children}

    </ThemeContext.Provider>
  )
}