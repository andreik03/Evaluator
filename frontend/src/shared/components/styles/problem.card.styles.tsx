import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    divider: {
        margin: "5px 0 10px",
        background: "#373938",
    },
    card: {
        width: 350,
        margin: 8,
        display: "flex",
        flexDirection: "column",
        background: "#2b2e2f",
        justifyContent: "space-between",
        maxHeight: 140,
    },
    cardContent: {
        flexGrow: 1,
        color: "#e4e2de",
    },
    cardActionArea: {
        justifyContent: "flex-end",
        alignContent: "flex-end",
        flexGrow: 1,
    },

    cardActions: {
        justifyContent: "center",
        aligncontent: "flex-end",
    },
    cardTitle: {
        color: "#69a6d5",
        fontWeight: "bold",
    },
    problemDemand: {}
}));
