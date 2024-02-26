import MUIDataTable from "mui-datatables";
import { all } from "../services/devs.api";
import { useQuery, useQueryClient } from "react-query";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import Delete from "./delete";
import SnackbarGlobal from "./snackbar";
import Edit from "./edit";

export default function Table(){
    const [openDelete, setOpenDelete] =  useState(false)
    const [openEdit, setOpenEdit] =  useState(false)
    const [notification, setNotification] = useState({open: false, message: '', severity: 'info'})

    const [idSelected, setIdSelected] = useState()
    
    const { data } = useQuery('devs', all, {
       
    })

    const queryClient = useQueryClient()

    //? Refrescamos los datos
    const handleRefreshData = () => {queryClient.invalidateQueries('devs')}
    const handleResetActions = () => {setOpenDelete(false); setOpenEdit(false)}
    const handleWatchAction = (success, message, severity) => {
        setNotification({open: true, message: message, severity: severity})
        if (success) { handleResetActions(); handleRefreshData()}
    }

    const Actions = (id) => (<Stack spacing={1} direction={'row'}>
        <Button onClick={()=>{setOpenEdit(true);setIdSelected(data?.data.find(item => (item._id === id.id)))}} variant="contained" color="primary">Editar</Button>
        <Button onClick={()=>{setOpenDelete(true);setIdSelected(data?.data.find(item => (item._id === id.id)))}} variant="contained" color="error">Eliminar</Button>    
    </Stack>)

    const columns = [
        {
            label:'Nombre',
            name:'name'
        },
        {
            label:'Edad',
            name:'age'
        },
        {
            label:'Habilidades',
            name:'hability'
        },
        {
            label:'Acciones',
            name:'_id',
            options:{
                customBodyRender: (value) => <Actions id={value}/>
            }
        }
    ]
    return (<>
        <MUIDataTable
            columns={columns}
            data={data?.data}
        />
        <Delete
            open={openDelete}
            close={() => setOpenDelete(false)}
            id={idSelected}
            watch={handleWatchAction}
        />
        <Edit
            open={openEdit}
            close={() => setOpenEdit(false)}
            id={idSelected}
            watch={handleWatchAction}
        />
        <SnackbarGlobal vertical='top' horizontal='right'  open={notification.open} close={() => setNotification({ open: false, message: "", severity: "info" })} message={notification.message} severity={notification.severity} />
    </>)
}