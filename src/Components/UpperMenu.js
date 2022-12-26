import React from 'react'
import { UseTestMode } from '../Context/TestContext'

const UpperMenu = ({countDown}) => {

    const {setTestSecond} = UseTestMode()

    const updateTime = (e) =>{
         setTestSecond(e.target.id)
    }

  return (
    <div className='upper-menu'>
        <div className='counter'>
            {countDown}
        </div>
        <div className='time-modes'>
            <div className='time' id={15} onClick={updateTime}>15s</div>
            <div className='time' id={30} onClick={updateTime}>30s</div>
            <div className='time' id={60} onClick={updateTime}>60s</div>
        </div>
    </div>
  )
}

export default UpperMenu