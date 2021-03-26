import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import { Problem } from "../models/problem.model";
import { useStyles } from "./styles/problem-description.style";

type Props = {
    problem: Problem;
}

export const ProblemDescription = (props: Props) => {

    const classes = useStyles();

    return (
        <>
            <Paper elevation={10} className={classes.problemPaperContainer}>
                <Typography variant="h4" className={classes.problemTitle}>
                    {props.problem.title}
                </Typography>

                <Divider className={classes.problemTitleDivider} />

                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                >
                    <Grid item className={classes.problemItem}>
                        <Typography className={classes.problemSubtitle}>Demand</Typography>
                        <Typography className={classes.problemSubtitleBody}>{props.problem.demand}</Typography>
                    </Grid>
                    <Grid item className={classes.problemItem}>
                        <Typography className={classes.problemSubtitle}>Input data</Typography>
                        <Typography className={classes.problemSubtitleBody}>{props.problem.input_data}</Typography>
                    </Grid>
                    <Grid item className={classes.problemItem}>
                        <Typography className={classes.problemSubtitle}>Output data</Typography>
                        <Typography className={classes.problemSubtitleBody}>{props.problem.output_data}</Typography>
                    </Grid>
                    <Grid item className={classes.problemItem}>
                        <Typography className={classes.problemSubtitle}>Rectrictions</Typography>
                        <Typography className={classes.problemSubtitleBody}>{props.problem.restrictions}</Typography>
                    </Grid>
                    <Grid item className={classes.problemItem}>
                        <Typography className={classes.problemSubtitle}>Example</Typography>
                        <Typography className={classes.problemSubtitleBody}>{props.problem.example}</Typography>
                    </Grid>

                </Grid>
            </Paper>
        </>
    );
}

export default ProblemDescription;