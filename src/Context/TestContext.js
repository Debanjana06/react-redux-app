import { createContext, useContext, useState } from "react";


const TestModeContext = createContext();

export const TestModeContextProvider = ({ children }) => {


   const [testSecond, setTestSecond] = useState(15)

   const values = {
      testSecond,
      setTestSecond
   }




   return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

export const UseTestMode = () => useContext(TestModeContext)