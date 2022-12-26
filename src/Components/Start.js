import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAlert } from '../Context/AlertContext';
import { auth, db } from '../firebaseConfig';
import Graph from './Graph'

const Start = ({wpm, accuracy,correctChars,inCorrectChars,missedChars,extraChars,graphData}) => {
  var timeSet = new Set();

  const {setAlert} = useAlert()

  const newGraph = graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  });

  const [user] = useAuthState(auth)
  const pushResultsToDatabase = async()=>{
    const resultRef = db.collection('Results')
    const {uid} = auth.currentUser


    await resultRef.add({
      wpm: wpm,
      accuracy:accuracy,
      characters : `${correctChars}/${inCorrectChars}/${missedChars}/${extraChars}`,
      userId: uid,
      timeStamp: new Date()

    }).then((response)=>{
        setAlert({
          open: true,
          type: 'success',
          message:'result saved to db'
        })
    })
  }

  useEffect(() => {
    if(user){
      //saving  bez user is logged in
      pushResultsToDatabase();
      
    }
    else{
      //no user , so save
      setAlert({
        open:true,
        type:'warning',
        message:'login to save result'
      })
      
    }
  }, [])
  // console.log(graphData,newGraph)
  return (
    <div className='stats-box'>
       <div className='left-stats'>
          <div className='title'>WPM</div>
          <div className='subtitle'>{wpm}</div>
          <div className='title'>Accuracy</div>
          <div className='subtitle'>{accuracy}%</div>
          <div className='title'>characters</div>
          <div className='subtitle'>{correctChars}/{inCorrectChars}/{missedChars}/{extraChars}</div>
       </div>
       <div className='right-stats'>
        {/* graph camp will go here */}
        <Graph graphData={newGraph}/>
       </div>
    </div>
  )
}

export default Start