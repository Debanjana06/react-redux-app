import React from 'react'
import { useNavigate } from 'react-router-dom'
import AccountIcon from './AccountIcon'
import CompareButton from './CompareButton'

const Header = () => {
  const navigate = useNavigate()
  const backtohome = () =>{
     navigate('/')
  }
  return (
    <div className='header'>
        <div className='logo' onClick={backtohome}>
          <span>
            LOGO
          </span>
          <div>
            <CompareButton/>
          </div>
       </div>
        <div className='user-logo'>
            <AccountIcon/>
        </div>
    </div>
  )
}

export default Header