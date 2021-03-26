import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from "./styles/create-problem.btn.style"
import ApiService from "../services/api-service";

const emptyProblem = {
    id: 0,
    title: "",
    statement: "",
    demand: "",
    input_data: "",
    output_data: "",
    restrictions: "",
    example: "",
    pub_date: new Date(Date.now()),
    default_code: "",
}

export default function CreateProblemBtn() {
    const [open, setOpen] = React.useState(false);
    const [fields, setFields] = useState(emptyProblem);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        ApiService.postProblem(fields);
        setOpen(false)
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} className={classes.createProblemBtn}>
                Create problem
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" className={classes.addProblemDialog}>
                <DialogTitle>Add problem</DialogTitle>
                <DialogContent className={classes.addProblemDialogContent}>
                    <DialogContentText>
                        Fill out the form in order to publish your problem to the database.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        required
                        onChange={e => setFields({ ...fields, title: e.target.value })}
                    />
                    <TextField label="Statement" margin="dense" fullWidth multiline onChange={e => setFields({ ...fields, statement: e.target.value })} />
                    <TextField label="Demand" margin="dense" fullWidth multiline required onChange={e => setFields({ ...fields, demand: e.target.value })} />
                    <TextField label="Input data" margin="dense" fullWidth multiline required onChange={e => setFields({ ...fields, input_data: e.target.value })} />
                    <TextField label="Output data" margin="dense" fullWidth multiline required onChange={e => setFields({ ...fields, output_data: e.target.value })} />
                    <TextField label="Restrictions" margin="dense" fullWidth multiline onChange={e => setFields({ ...fields, restrictions: e.target.value })} />
                    <TextField label="Example" margin="dense" fullWidth multiline required onChange={e => setFields({ ...fields, example: e.target.value })} />
                    <TextField label="Default code" margin="dense" fullWidth multiline required onChange={e => setFields({ ...fields, default_code: e.target.value })} />

                </DialogContent>
                <DialogActions className={classes.addProblemDialogActions}>
                    <Button variant="outlined" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}