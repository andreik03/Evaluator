import { Card, CardActionArea, CardContent, Typography, Divider } from "@material-ui/core"
import { Problem } from "../../shared/models/problem.model"
import { useStyles } from "./styles/problem.card.styles";

type Props = {
    problem: Problem;
}

const ProblemCard = (props: Props) => {

    const classes = useStyles();

    return (
        <Card className={classes.card} >
            <CardActionArea className={classes.cardActionArea} href={`/problem-details/${props.problem.id}`}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.cardTitle} variant="h5">
                        {props.problem.title}
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography className={classes.problemDemand} variant="body2" component="p">
                        {props.problem.demand}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProblemCard;