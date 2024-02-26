import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { save } from "../services/devs.api";
import { Button, Card, Grid, TextField } from "@mui/material";
import Loading from "./loading";

export default function Create({watch}) {
    let {reset, handleSubmit, register} = useForm()

    const mutation = useMutation(save, {
        onSuccess: () => {
            reset()
            watch(true, 'Datos guardados exitosamente', 'success')
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    return (
        <Card>
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
                <Grid item md={12}>
                    <Button variant="contained" fullWidth onClick={handleSubmit(onSubmit)}>
                        {mutation.isLoading ? <Loading/> : 'Guardar'}
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}