import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Graph from '../Components/Graph'
import { auth, db } from '../firebaseConfig'
import FirstPageIcon from '@mui/icons-material/FirstPage';

const ComparePage = () => {
    const { username } = useParams()
    const [loggedinUserData,setLoggedinUserData] = useState([])
    const [loggedinUserGraphData,setLoggedinUserGraphData] = useState([])
    
    const [compareUserData,setcompareUserData] = useState([]) 
    const [compareUserGraphData,setcompareUserGraphData] = useState([]) 

    const getUID = async () => {

        const response = await db.collection('usernames').doc(username).get()
        return response.data().uid
    }
    const getData = async () => {
        const compareUserUID = await getUID()
        const { uid } = auth.currentUser

        const resultRef = db.collection('Results')
        let tempData = [];
        let tempGraphData = []
        resultRef.where('userId', '==', uid).orderBy('timeStamp', 'desc').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                console.log("working");
                tempData.push({ ...doc.data() })
                tempGraphData.push([doc.data().timeStamp, doc.data().wpm])
            })
            setLoggedinUserData(tempData)
            setLoggedinUserGraphData(tempGraphData.reverse())
            
        })

        let tempData1 = [];
        let tempGraphData1 = []
        resultRef.where('userId', '==', compareUserUID).orderBy('timeStamp', 'desc').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                console.log("working");
                tempData1.push({ ...doc.data() })
                tempGraphData1.push([doc.data().timeStamp, doc.data().wpm])
            })
            setcompareUserData(tempData1)
            setcompareUserGraphData(tempGraphData1.reverse())
           
        })
    }

    const navigate = useNavigate();

    const GoBackToHomePage = ()=>{
        navigate('/')
    }

    useEffect(() => {
      getData()
    }, [])

    return (
       
        <div className='comparision'>
            <div className="back" onClick={GoBackToHomePage}>
                <FirstPageIcon/>
            </div>
            <div className='graph-data'>
                <div className="you">You</div>
                <Graph graphData = {loggedinUserGraphData} type='date' />
            </div>
            
            <div className='graph-data' username={username}> 
            <div className="compareUse">{username}</div>   
                <Graph graphData = {compareUserGraphData}  type='date' />
            </div>
           
        </div>    
    )
}

export default ComparePage