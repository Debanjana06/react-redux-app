import { LinearProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Graph from '../Components/Graph'
import ResultTable from '../Components/ResultTable'
import { auth,db } from '../firebaseConfig'

const UserPages = () => {
  const [data, setData] = useState([])
  const [user,loading] = useAuthState(auth)
  const [graphData , setGraphData] = useState([])

  const fetchUserData = ()=>{
    const resultRef = db.collection('Results')
    const {uid} = auth.currentUser;
      let tempData = [];
      let tempGraphData = []
      resultRef.where('userId', '==', uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
        console.log("working");
        tempData.push({...doc.data()})
        tempGraphData.push([doc.data().timeStamp , doc.data().wpm])
      })
      console.log(tempData);
      setData(tempData)
      setGraphData(tempGraphData.reverse())
    })
   
  }
  useEffect(() => {
    if(!loading){
      fetchUserData()
    }
    
  },[loading])

  if(loading){
    return <LinearProgress/>
  }
  return (
    <>
      <ResultTable data={data} />
      <Graph graphData={graphData} typr='date' />
    </>

  )
}

export default UserPages