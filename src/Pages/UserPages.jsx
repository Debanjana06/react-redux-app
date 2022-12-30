import { LinearProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Graph from '../Components/Graph'
import Header from '../Components/Header'
import ResultTable from '../Components/ResultTable'
import UserInfo from '../Components/UserInfo'
import { useTheme } from '../Context/ThemeContext'
import { auth,db } from '../firebaseConfig'


const UserPages = () => {
  const {theme} = useTheme()
  const [data, setData] = useState([])
  const [dataLoading,SetDataLoading] = useState(true)
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
      SetDataLoading(false)
    })
   
  }
  useEffect(() => {
    if(!loading && user){
      fetchUserData()
    }
    
  },[loading])

  if(!loading && !user){
    return (
      <div className="center-of-screen">
        <span>Login to view user page!</span>
      </div>
    )
  }

  if(loading || dataLoading){
    return <LinearProgress />
  }
  return (
    <div className='canvas'>
      <Header/>
      <UserInfo totalTestTaken={data.length}/>
       <div className="graph">
       <Graph graphData={graphData} typr='date' />
       </div>
     <ResultTable data={data} />
    </div>

  )
}

export default UserPages