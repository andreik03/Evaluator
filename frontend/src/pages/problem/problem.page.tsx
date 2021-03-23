import { Container, Grid, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import CodeEditor from "../../shared/components/code-editor";
import ProblemDescription from "../../shared/components/problem-description";
import { Problem } from "../../shared/models/problem.model";
import ApiService from "../../shared/services/api-service";
import { useStyles } from "./problem.page.styles";

type Props = {
    match: {
        params: {
            problemId: number;
        }
    }
}

const blankProblem: Problem = {
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

const ProblemPage = (props: Props) => {

    const classes = useStyles();

    const [problem, setProblem] = useState(blankProblem)

    const updateProblem = () => {
        ApiService.getProblemById(props.match.params.problemId)
            .then((problem: Problem) => setProblem(problem));
    };


    // onMount
    useEffect(() => {
        updateProblem();
    }, [props])

    return (
        <Container className={classes.problemContainer}>
            <Grid
                container
                direction="column"
                spacing={3}
            >
                <Grid item>
                    <ProblemDescription problem={problem} />
                </Grid>
                <Grid item>
                        <CodeEditor problem={problem}></CodeEditor>
                </Grid>
            </Grid>
        </Container >
    );
}

export default ProblemPage;