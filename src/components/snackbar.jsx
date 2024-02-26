//? Componente de notificaion de snackbar
import React from 'react'
import { Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarGlobal = ({ vertical, horizontal, open, close, message, severity }) => (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={open}
      autoHideDuration={5000}
      onClose={close}
    >
      <Alert onClose={close} severity={severity} sx={{ width: "100%" }}> { message } </Alert>
    </Snackbar>
)

export default SnackbarGlobal
