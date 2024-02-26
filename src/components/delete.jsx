import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useMutation } from "react-query";
import { remove } from "../services/devs.api";
import Loading from "./loading";

export default function Delete({open, close, id, watch}){
    const mutation = useMutation(remove, {
        onSuccess: () => {
            close()
            watch(true, 'Datos eliminados exitosamente', 'success')
        }
    })
    return(<Dialog
        fullWidth
        // maxWidth={maxWidth}
        open={open}
        // TransitionComponent={Transition}
        scroll={`paper`}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
    >
        <DialogTitle>Eliminar Dev</DialogTitle>
        <Divider/>
        <DialogContent>
            ¿Esta seguro que desea eliminar a <b>{id?.name}</b>?
        </DialogContent>
        <Divider/>
        <DialogActions>
            <Button onClick={()=>mutation.mutate(id?._id)} variant="contained" color="error">
                {mutation.isLoading ? <Loading/> : 'Eliminar'}
            </Button>
            <Button onClick={()=>close()} variant="contained" color="primary">Cancelar</Button>
        </DialogActions>
    </Dialog>)
}