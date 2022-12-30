
import { makeStyles } from '@material-ui/core'
import { Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../Context/AlertContext'
import { useTheme } from '../Context/ThemeContext'
import { auth, db } from '../firebaseConfig'

const useStyle = makeStyles(()=>({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 'auto',
        textAlign:'center'
    }
}))

const CompareButton = () => {
    const [open, setOpen] = useState(false)
    const [userName,setUserName] = useState('')
    const handleClose = () =>{
        setOpen(false);
    }

    const {theme} = useTheme()
    const {setAlert} = useAlert()
    const classes = useStyle()

    const navigate = useNavigate()

    const checkUserNameAvailability = async () => {
      const ref = db.collection('usernames')
      const response = await ref.doc(userName).get()
      return response.exists
    }
  
    const handleSubmit=async()=>{
       if(await checkUserNameAvailability()){
        navigate(`/compare/${userName}`)
       }
       else{
        setAlert({
          open:true,
          type:'warning',
          message:'invalid username'
        })
       }
    }

    const handleClick=()=>{
      if(auth.currentUser){
        setOpen(true)
      }
      else{
        setAlert({
          open:true,
          type:'warning',
          message:'login to use compare'
        })
      }
    }
  return (
    <div>
        <div className='compare-btn' onClick={handleClick}>
          COMPARE
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          className={classes.modal}
        >
           <div className={classes.box}>
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
      <Button
       variant='contained'
       size='large'
       style={{backgroundColor: theme.title, color: theme.background, marginLeft:'5px',marginTop:'10px'}}
       onClick={handleSubmit}>
        compare
        </Button>
           </div>
        </Modal>
    </div>
  )
}

export default CompareButton