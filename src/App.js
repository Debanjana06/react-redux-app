import './App.css';
import TypingBox from './Components/TypingBox';
import GlobalStyle from './Styles/global';

var randomWords = require('random-words')

function App() {

  const words = randomWords(100)
  console.log(words)

  return (
    <div className='canvas'>
    <GlobalStyle/>
    <h1>Typing test</h1>
    <TypingBox words={words}/>
    <h1>Footer</h1>
    </div>
  );
}

export default App;
