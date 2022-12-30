

import Footer from '../Components/Footer';
import Header from '../Components/Header';
import TypingBox from '../Components/TypingBox';
import { auth } from '../firebaseConfig';

var randomWords = require('random-words')

const HomePage = () => {
   
  const words = randomWords(100)

  
  return (
   

    <div className='canvas'>
        
        <Header/>
        <TypingBox words={words}/>
        <Footer/>
    </div>

  
  )
}

export default HomePage