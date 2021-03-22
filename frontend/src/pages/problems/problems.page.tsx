import { Container, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Problem } from "../../shared/models/problem.model";
import ApiService from "../../shared/services/api-service";
import ProblemCard from "../../shared/components/problem.card";

import { useStyles } from "./problems.page.styles";

const emptyProblems: Array<Problem> = []

const ProblemsPage = () => {

    const classes = useStyles();
    const [problems, setProblems] = useState(emptyProblems);

    useEffect(() => {
        updateProblems();
    }, []);

    const updateProblems = () => {
        ApiService.getProblems()
            .then((problems: Array<Problem>) => {
                setProblems(problems)
            })
    }

    return (
        <>
            <Container className={classes.header}>
                <Typography variant="subtitle1">
                    Welcome to problems page!
                </Typography>
            </Container>

            <Grid className={classes.problemsGrid}>
                {
                    problems.map((problem) =>
                        <ProblemCard
                            key={problem.id}
                            problem={problem}
                        ></ProblemCard>
                    )
                }
            </Grid>
        </>
    );
}

export default ProblemsPage;