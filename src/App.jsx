import { Grid } from "@mui/material";
import Create from "./components/create";
import Table from "./components/table";
import SnackbarGlobal from "./components/snackbar";
import { useQueryClient } from "react-query";
import { useState } from "react";

export default function App() {
  const [notification, setNotification] = useState({open: false, message: '', severity: 'info'})

  const queryClient = useQueryClient()

  //? Refrescamos los datos
  const handleRefreshData = () => {queryClient.invalidateQueries('devs')}
  const handleWatchAction = (success, message, severity) => {
      setNotification({open: true, message: message, severity: severity})
      if (success) { handleRefreshData()}
  }

  return (  
    <Grid container>
      <Grid item xs={12} md={3} lg={3} p={2}>
        <h1>Datos</h1>
        <Create watch={handleWatchAction}/>
      </Grid>
      <Grid item xs={12} md={9} lg={9} p={2}>
        <h1>Lista de desarrolladores</h1>
        <Table/>
      </Grid>
      <SnackbarGlobal vertical='top' horizontal='right'  open={notification.open} close={() => setNotification({ open: false, message: "", severity: "info" })} message={notification.message} severity={notification.severity} />

    </Grid>
  )
}

