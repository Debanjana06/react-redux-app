import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useAlert } from '../Context/AlertContext'
import { auth } from '../firebaseConfig'

const LoginForm = ({handleClose}) => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const {setAlert} = useAlert()
const handleSubmit = () =>{
    if(!email || !password){
      setAlert({
        open:true,
        type:'warning',
        message:'Fill the details'
      })
      return
    }

    auth.signInWithEmailAndPassword(email,password).then((Response)=>{
      setAlert({
        open:true,
        type:'success',
        message: 'looged in'
      })
      handleClose();
    }).catch((err)=>{
      console.log("error", err);
      setAlert({
        open:true,
        type:'error',
        message: 'failed to looged in'
      })
    })
}

  return (
    <Box
     p={3}
     style={{
      display: 'flex',
      flexDirection:'column',
      gap:'20px'
     }}
    >
      <TextField
       type='email'
       variant='outlined'
       label='Enter Email'
       onChange={(e)=>setEmail(e.target.value)}
       />
      <TextField
      type='password'
      variant='outlined'
      label='Enter Password' 
      onChange={(e)=>setPassword(e.target.value)}
       />
      <Button
       variant='contained'
       size='large'
       onClick={handleSubmit}
      >Login</Button>
    </Box>
  )
}

export default LoginForm