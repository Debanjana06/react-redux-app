import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'
import { useAlert } from '../Context/AlertContext'

const AlertSnap = () => {
    const {alert , setAlert} = useAlert()
  
    const handleClose = (event,reason) =>{
        if(reason === 'clickaway'){
            return
        }
        setAlert({
            open: false,
            type:'',
            message:''
        })
    }
  return (
    <div>
        <Snackbar
        open={alert.open} 
        autoHideDuration={3000}
         onClose={handleClose}
         anchorOrigin={
            {
                vertical:'top',
                horizontal:'right'
            }
         }>

         <Slide in={alert.type}>
         <Alert severity={alert.type}>
              {alert.message}
            </Alert>
         </Slide>

        </Snackbar>
    </div>
  )
}

export default AlertSnap