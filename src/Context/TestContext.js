import { createContext, useContext, useState } from "react";


const TestModeContext = createContext();

export const TestModeContextProvider = ({ children }) => {

   const [testMode, setTestMode] = useState('time')
   const [testSecond, setTestSecond] = useState(15)
   const [testWords, setTestWords] = useState(10)

   const values = {
      testSecond,
      setTestSecond,
      testWords,
      setTestWords,
      testMode,
      setTestMode
   }




   return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

export const UseTestMode = () => useContext(TestModeContext)