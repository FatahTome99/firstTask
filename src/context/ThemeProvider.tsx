import React, { useContext, useState, useEffect } from "react"
import { ThemeContext } from "../context/ThemeContext";

import { auth } from "../firebase"

export function useTheme() {
  return useContext(ThemeContext)
}
export const ThemeProvider : React.FC<{}> = ({ children }) =>  {

  const [Theme, setTheme] = useState('light')

  function ChangeTheme() {
      if(Theme=='light')
        setTheme('dark');
     else
        setTheme('light')


    
  }

  return (
    <ThemeContext.Provider value= {{Theme, ChangeTheme}} >
      {children}

    </ThemeContext.Provider>
  )
}