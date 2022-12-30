import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useAlert } from '../Context/AlertContext'
import { useTheme } from '../Context/ThemeContext'
import errorMapping from '../Utils/errorMapping'

const SignupForm = ({ handleClose }) => {
  const { setAlert } = useAlert()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userName, setUserName] = useState('')
  const { theme } = useTheme()

  const checkUserNameAvailability = async () => {
    const ref = db.collection('usernames')
    const response = await ref.doc(userName).get()
    return !response.exists
  }


  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword || !userName) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Fill the details'
      })
      return
    }
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Password mismatched'
      })
      return
    }

    if (await checkUserNameAvailability()) {
      auth.createUserWithEmailAndPassword(email, password).then(async(Response) => {
        
        const ref = await db.collection('usernames').doc(userName).set({
          uid : Response.user.uid
        })
        setAlert({
          open: true,
          type: 'success',
          message: 'account created!'
        })
        handleClose();
      }).catch((err) => {
        console.log(err);
        setAlert({
          open: true,
          type: 'error',
          message: errorMapping[err.code] || "some error occured"
        })
      })
    }
    else{
      setAlert({
        open: true,
        type: 'warning',
        message: 'username taken'
      })
    }

  }

  return (
    <Box
      p={3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <TextField
        type='email'
        variant='outlined'
        label='Enter username'
        InputLabelProps={
          {
            style: {
              color: theme.title
            }
          }
        }
        InputProps={
          {
            style: {
              color: theme.title
            }
          }
        }
        onChange={(e) => setUserName(e.target.value)}
      />

      <TextField
        type='email'
        variant='outlined'
        label='Enter Email'
        InputLabelProps={
          {
            style: {
              color: theme.title
            }
          }
        }
        InputProps={
          {
            style: {
              color: theme.title
            }
          }
        }
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type='password'
        variant='outlined'
        label='Enter Password'
        InputLabelProps={
          {
            style: {
              color: theme.title
            }
          }
        }
        InputProps={
          {
            style: {
              color: theme.title
            }
          }
        }
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        type='password'
        variant='outlined'
        label='Enter confirm Password'
        InputLabelProps={
          {
            style: {
              color: theme.title
            }
          }
        }
        InputProps={
          {
            style: {
              color: theme.title
            }
          }
        }
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant='contained'
        size='large'
        onClick={handleSubmit}
      >SignUp</Button>
    </Box>
  )
}

export default SignupForm