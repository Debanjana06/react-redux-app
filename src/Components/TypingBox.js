import React, { createRef, useEffect, useRef, useState } from 'react'

const TypingBox = ({words}) => {

 const [currCharIndex, setCurrCharIndex] = useState(0) 
 const [currWordIndex, setCurrWordIndex] = useState(0) 

const inputRef = useRef()
const wordSpanRef = Array(words.length).fill(0).map(i => createRef(null))
console.log(wordSpanRef)
const handleKeyDown = (e)=>{
let allChildSpans =  wordSpanRef[currWordIndex].current.childNodes;

//logic for space presee => increase my currWordIndex by 1
if(e.keyCode === 32){
// removing cursor
if(allChildSpans.length <= currCharIndex){
//cursor present as a right one
allChildSpans[currCharIndex-1].classList.remove('right-current');
}else{
//cursor in bewteen
allChildSpans[currCharIndex].className = allChildSpans[currCharIndex].className.replace('current',"")
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
      allChildSpans[currCharIndex-1].className = 'char current';
      setCurrCharIndex(currCharIndex-1)
      return;
    }
  allChildSpans[currCharIndex].className = 'char';
  allChildSpans[currCharIndex-1].className = 'char current';
  setCurrCharIndex(currCharIndex-1)
  }
  return;
}





if(e.key === allChildSpans[currCharIndex].innerText){
  allChildSpans[currCharIndex].className = 'char correct'
}
else{
  console.log('user pressed incorrect key',e.key)
  allChildSpans[currCharIndex].className = 'char incorrect'
}

if(currCharIndex+1 === allChildSpans.length){
  allChildSpans[currCharIndex].className += ' right-current' 
}
else{
allChildSpans[currCharIndex+1].className = 'char current'
}
setCurrCharIndex(currCharIndex+1)
}

const focusInput = ()=>{
  inputRef.current.focus()
}

useEffect(()=>{
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = 'char current';
},[])

  return (
    <div>
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

       <input
         type='text'
         className='hidden-input'
         ref={inputRef}
         onKeyDown={(e)=>handleKeyDown(e)}
       />
    </div>
  )
}

export default TypingBox