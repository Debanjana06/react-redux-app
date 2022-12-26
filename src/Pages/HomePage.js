import { ThemeProvider } from 'styled-components';

import Footer from '../Components/Footer';
import Header from '../Components/Header';
import TypingBox from '../Components/TypingBox';
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import GlobalStyle from '../Styles/global';

var randomWords = require('random-words')

const HomePage = () => {
    const {theme} = useTheme()
  const words = randomWords(100)

  
  return (
    <ThemeProvider theme={theme}>

    <div className='canvas'>
        <GlobalStyle/>
        <Header/>
        <TypingBox words={words}/>
        <Footer/>
    </div>

  </ThemeProvider>
  )
}

export default HomePage