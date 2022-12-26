import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import { useAlert } from '../Context/AlertContext'

const SignupForm = ({handleClose}) => {
  const {setAlert} = useAlert()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = () =>{
      if(!email || !password || !confirmPassword){
        setAlert({
          open:true,
          type:'warning',
          message:'Fill the details'
        })
        return
      }
      if(password !== confirmPassword){
        setAlert({
          open:true,
          type:'warning',
          message:'Password mismatched'
        })
        return
      }

      auth.createUserWithEmailAndPassword(email,password).then((Response)=> {
        setAlert({
          open:true,
          type:'success',
          message:'account created!'
        })
        handleClose();
      }).catch((err)=>{
        console.log(err);
        setAlert({
          open:true,
          type:'error',
          message:'not able to create account'
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
       <TextField
      type='password'
      variant='outlined'
      label='Enter confirm Password' 
      onChange={(e)=>setConfirmPassword(e.target.value)}
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