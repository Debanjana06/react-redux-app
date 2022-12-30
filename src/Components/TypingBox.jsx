import { Dialog, DialogTitle } from '@material-ui/core'
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { UseTestMode } from '../Context/TestContext'
import Start from './Start'
import UpperMenu from './UpperMenu'

var randomWords = require('random-words')
const TypingBox = () => {

  const {testSecond,testWords,testMode} = UseTestMode()

  const [wordsArray , setWordsArray] = useState(()=>{
    if(testMode==='word'){
      return randomWords(testWords)
    }
    return randomWords(300)
  }) 

  const words = useMemo(()=>{
    return wordsArray
  },[wordsArray])
  

 const [currCharIndex, setCurrCharIndex] = useState(0) 
 const [currWordIndex, setCurrWordIndex] = useState(0) 
 const [countDown , setCountDown]= useState(()=>{
  if(testMode==='word'){
    return 180
  }
  return testSecond
 })

 const [testTime, setTestTime] = useState(()=>{
  if(testMode==='word'){
    return 180
  }
  return testSecond
 })

 const [correctChars, setCorrectChars] = useState(0)
 const [correctWords, setCorrectWords] = useState(0)
 const [inCorrectChars, setInCorrectChars] = useState(0)
 const [missedChars, setMissedChars] = useState(0)
 const [extraChars, setExtraChars] = useState(0)
 const [graphData, setGraphData] = useState([])
 const [testStart, setTestStart] = useState(false)
 const [testEnd, setTestEnd] = useState(false)
 const [intervalId, setIntervalId] = useState()
 const [open , setOpen]=useState(false)

const inputRef = useRef(null)
const wordSpanRef = useMemo(()=>{
  return Array(words.length).fill(0).map(i => createRef(null))
},[words])

const resetTest = ()=>{
  setCurrCharIndex(0)
  setCurrWordIndex(0)
  setTestStart(false)
  setTestEnd(false)
  clearInterval(intervalId)
  if(testMode==='word'){
    setWordsArray(randomWords(testWords))
    setCountDown(180)
    setTestTime(180)
  } else{
    setWordsArray(randomWords(300))
    setCountDown(testSecond)
    setTestTime(testSecond)
  }
  
  setGraphData([])
  setCorrectChars(0)
  setCorrectWords(0)
  setExtraChars(0)
  setInCorrectChars(0)
  setMissedChars(0)
  resetWordSpanRefClassName()
  focusInput()
}

const redoTest = ()=>{
  setCurrCharIndex(0)
  setCurrWordIndex(0)
  setTestStart(false)
  setTestEnd(false)
  clearInterval(intervalId)
  if(testMode==='word'){
    setCountDown(180)
    setTestTime(180)
  } else{
    setCountDown(testSecond)
    setTestTime(testSecond)
  }
  
  setGraphData([])
  setCorrectChars(0)
  setCorrectWords(0)
  setExtraChars(0)
  setInCorrectChars(0)
  setMissedChars(0)
  resetWordSpanRefClassName()
  focusInput()
}
const startTimer = () =>{
  
  const intervalId = setInterval(timer,1000);
  setIntervalId(intervalId)
//timer function
  function timer (){
    console.log('timer function working')
    setCountDown((prevCountDown)=>{
   
      // get set cahracter

     setCorrectChars((correctChars)=>{
      setGraphData((data)=>{
        return [...data , [testTime - prevCountDown,Math.round((correctChars/5)/((testTime-prevCountDown+1)/60))]]
      });
      return correctChars;
     })


      if(prevCountDown === 1){
        setTestEnd(true);
         clearInterval(intervalId);
         return 0;
      }
      return prevCountDown - 1;
    });
  }


}



const handleKeyDown = (e)=>{

   if(e.keyCode === 9){
    if(testStart){
      clearInterval(intervalId)
    }
    e.preventDefault()
    setOpen(true)
    return
   }



let allChildSpans =  wordSpanRef[currWordIndex].current.childNodes;

if(e.keyCode!==8 && e.key.length>1){
  e.preventDefault()
  return
}
if(!testStart){
  startTimer();
  setTestStart(true)
}




//logic for space presee => increase my currWordIndex by 1
if(e.keyCode === 32){

  if(currWordIndex===wordsArray.length-1){
    clearInterval(intervalId)
    setCurrWordIndex(currWordIndex+1)
    setTestEnd(true)
    return
  }





  const correctChars = wordSpanRef[currWordIndex].current.querySelectorAll('.correct')

  if(correctChars.length === allChildSpans.length){
     setCorrectWords(correctWords+1)
  }
// removing cursor
if(allChildSpans.length <= currCharIndex){
//cursor present as a right one
allChildSpans[currCharIndex-1].classList.remove('right-current');
}else{
//cursor in bewteen
setMissedChars(missedChars+(allChildSpans.length-currCharIndex))
for(let i = currCharIndex; i<allChildSpans.length;i++){
  allChildSpans[i].className += ' skipped';
}
allChildSpans[currCharIndex].className = allChildSpans[currCharIndex].className.replace('current',"")
}

//scrolling line condition
if(wordSpanRef[currWordIndex+1].current.offsetLeft < wordSpanRef[currWordIndex].current.offsetLeft){
  wordSpanRef[currWordIndex].current.scrollIntoView() 
} 

  wordSpanRef[currWordIndex+1].current.childNodes[0].className = 'char current';
  setCurrWordIndex(currWordIndex+1)
  setCurrCharIndex(0)

  return;
}

//backspace logic
if(e.keyCode === 8){

  if(currCharIndex!== 0){

    if(currCharIndex === allChildSpans.length){
   
      if(allChildSpans[currCharIndex-1].className.includes('extra')){
        allChildSpans[currCharIndex-1].remove();
        allChildSpans[currCharIndex-2].className += ' right-current'
      }
      else{
        allChildSpans[currCharIndex-1].className = 'char current';
      }

      
      setCurrCharIndex(currCharIndex-1)
      return;
    }
  allChildSpans[currCharIndex].className = 'char';
  allChildSpans[currCharIndex-1].className = 'char current';
  setCurrCharIndex(currCharIndex-1)
  }
  return;
}

if(currCharIndex === allChildSpans.length){
  // add extra characters

  setExtraChars(extraChars+1)
 let newSpan = document.createElement('span'); // -> return span tag
 newSpan.innerText = e.key;
 newSpan.className = 'char incorrect extra right-current';
 allChildSpans[currCharIndex-1].classList.remove('right-current');
 wordSpanRef[currWordIndex].current.append(newSpan);

 setCurrCharIndex(currCharIndex+1);
  return;
}


if(e.key === allChildSpans[currCharIndex].innerText){
  allChildSpans[currCharIndex].className = 'char correct'
  setCorrectChars(correctChars+1)
  
  if(currWordIndex===wordsArray.length-1 && currCharIndex===allChildSpans.length-1){
   clearInterval(intervalId)
   setCurrWordIndex(currWordIndex+1)
   setTestEnd(true)
   return
  }
}
else{
  allChildSpans[currCharIndex].className = 'char incorrect'
  setInCorrectChars(inCorrectChars+1)
}

if(currCharIndex+1 === allChildSpans.length){
  allChildSpans[currCharIndex].className += ' right-current' 
}
else{
allChildSpans[currCharIndex+1].className = 'char current'
}
setCurrCharIndex(currCharIndex+1)
}

const handleDialogBoxEvent = (e) =>{
  if(e.keyCode === 32){
    //logic for redo game
   e.preventDefault()
   redoTest()
   setOpen(false)
   return

    return
  }
  if(e.keyCode===9 || e.keyCode===13){
   //  logic for restart
   e.preventDefault()
   resetTest()
   setOpen(false)
   return
  }
  e.preventDefault()
  setOpen(false)
  startTimer()
}

const resetWordSpanRefClassName = ()=>{
  wordSpanRef.map(i=>{
     Array.from(i.current.childNodes).map(j=>{
      j.className = 'char'
     })
  })
  wordSpanRef[0].current.childNodes[0].className = 'char current'
}

const calculateWPM = () =>{
  return Math.round((correctChars/5)/((graphData[graphData.length-1][0]+1)/60))
}

const calculateAccuracy = () =>{
  return Math.round((correctWords/currWordIndex)*100)
}



const focusInput = ()=>{
  inputRef.current.focus()
}

useEffect(()=>{
    focusInput();
    // startTimer();
    wordSpanRef[0].current.childNodes[0].className = 'char current';
},[]);

useEffect(() => {
   resetTest()
}, [testSecond,testWords,testMode])

  return (
    <div>
        <UpperMenu countDown={countDown} currWordIndex={currWordIndex}/>
        {(testEnd) ? 
        (<Start 
            wpm={calculateWPM()} 
            accuracy={calculateAccuracy()}
            correctChars={correctChars} 
            inCorrectChars={inCorrectChars} 
            missedChars={missedChars} 
            extraChars={extraChars}
            graphData={graphData}
            resetTest={resetTest}
            />) : 
        (
         <div className='type-box' onClick={focusInput}>
            <div className='words'>
              {words.map((word,index)=>(
                  <span className='word' ref={wordSpanRef[index]} key={index}>
                      {word.split('').map((char,ind)=>(
                          <span className='char' key={ind}>{char}</span>
                      ))}
                  </span>
              ))}
           </div>
      </div>
        )}
       
      

       <input
         type='text'
         className='hidden-input'
         ref={inputRef}
         onKeyDown={(e)=>handleKeyDown(e)}
       />
       <Dialog
        open={open}
        style={{
          backdropFilter: 'blur(2px)'
        }}
        PaperProps={{
          style: {
            backgroundColor:'transparent',
            boxShadow:'none'
          }
        }}
        onKeyDown={handleDialogBoxEvent}
        >
         <DialogTitle>
            <div className="instruction">press SPACE to redo</div>
            <div className="instruction">press TAB/ENTER to restart</div>
            <div className="instruction">press any other key to exit</div>
         </DialogTitle>
       </Dialog>
    </div>
  )
}

export default TypingBox