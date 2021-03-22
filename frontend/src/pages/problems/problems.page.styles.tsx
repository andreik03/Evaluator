import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    header: {
        background: "#434343",
        textAlign: "center",
        color: "#e4e2de",
        padding: "10px",
    },

    problemsGrid: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
    }
}));
