import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { update } from "../services/devs.api";
import { Button,  Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from "@mui/material";
import Loading from "./loading";
import { useEffect } from "react";

export default function Edit({open, close, id, watch}) {
    let {reset, handleSubmit, register} = useForm()

    useEffect(()=>{
        if(id !== undefined && id !== null && id !== ''){
            reset({
                name: id?.name,
                age: id?.age,
                hability: id?.hability
            })
        }
    }, [id])

    const mutation = useMutation(update, {
        onSuccess: () => {
            reset()
            watch(true, 'Datos actualizados exitosamente', 'success')
        }
    })

    const onSubmit = (params) => {
        mutation.mutate({id: id?._id, params})
    }

    return (
        <Dialog
            fullWidth
            // maxWidth={maxWidth}
            open={open}
            // TransitionComponent={Transition}
            scroll={`paper`}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle>Editar Dev</DialogTitle>
            <Divider/>
            <DialogContent>
                <Grid container spacing={2} p={2}>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            {...register('name')}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            label="Edad"
                            type="number"
                            {...register('age')}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            label="Halibidades"
                            {...register('hability')}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={()=>close()} variant="contained" color="error">Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                    {mutation.isLoading ? <Loading/> : 'Guardar'}
                </Button>
            </DialogActions>
        </Dialog>
       
    )
}