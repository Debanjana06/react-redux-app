import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import  {AppBar, Box, Modal, Tab,Tabs} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { auth, db } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';

const useStyle = makeStyles(()=>({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400,
        textAlign:'center'
    }
}))




const AccountIcon = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [user] = useAuthState(auth)
    const {setAlert} = useAlert()
    const handleClose = () =>{
        setOpen(false);
    }

    const handleValueChange = (e,v) =>{
        setValue(v);
    }
       
    const navigate =  useNavigate()
    const handleOpen = () =>{
      if(user){
        //routing bez user is logged in
        navigate('/user')
        
      }
      else{
        //no user , so open login/signup form
        setOpen(true)
        
      }
       
    }

    const logOut = () =>{
      auth.signOut().then((response)=>{
        setAlert({
          open:true,
          type:'success',
          message:'logged out'
        })
      }).catch((err)=>{
        setAlert({
          open:true,
          type:'error',
          message:'failed to logged out'
        })
      })
    }

    const googleProvider = new GoogleAuthProvider()
    const signInWithGoogle = () =>{
      signInWithPopup(auth,googleProvider).then(async(Response)=>{
        const username = Response.user.email
          const ref = await db.collection('usernames').doc(username).set({
            uid : Response.user.uid
          })
        setAlert({
          open:true,
          type:'success',
          message:'loggede in from google'
        })
        handleClose()
      }).catch((err)=>{
        console.log('login failed',err);
        setAlert({
          open:true,
          type:'error',
          message:'failed to logged in from google'
        })
      })
    }

    const githubProvider = new GithubAuthProvider()
    const signInWithGithub=()=>{
        signInWithPopup(auth, githubProvider).then(async(response)=>{
          const username = response.user.email.split('@')[0]
          const ref = await db.collection('usernames').doc(username).set({
            uid : response.user.uid
          })
          setAlert({
            open:true,
            type:'success',
            message:'loggede in from github'
          })
        }).catch((err)=>{
          console.log(err);
          setAlert({
            open:true,
            type:'error',
            message:'failed to loggede in from github'
          })
        })
    }

    const {theme} = useTheme()
     const classes = useStyle();

  return (
    <div>
        <AccountCircleIcon onClick={handleOpen}/>
        {(user) && <LogoutIcon onClick={logOut}/>}
      
      <Modal
         open={open}
         onClose={handleClose} 
         className = {classes.modal} 
      >
        <div className={classes.box}>
            <AppBar position='static'
             style={{background:'transparent'}} >
                <Tabs
                   value={value}
                   onChange={handleValueChange}
                >
                    <Tab label='login' style={{color: theme.title}}></Tab>
                    <Tab label='signup' style={{color: theme.title}}></Tab>
                </Tabs>
            </AppBar>

          {value === 0 && <LoginForm handleClose={handleClose}/>}
          {value === 1 && <SignupForm handleClose={handleClose}/>}

          <Box>
            <span>OR</span>
            <GoogleButton
             style={{width:'100%' , marginTop:'8px'}}
             onClick={signInWithGoogle}
            />
          </Box>

          <Box>
            <span>OR</span>
              <div className='github-button' onClick={signInWithGithub}>
                Login with Github
              </div>
          </Box>

        </div>
      </Modal>
    </div>
  )
}

export default AccountIcon