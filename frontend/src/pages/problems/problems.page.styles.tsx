import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    heading: {
        background: "#434343",
        textAlign: "center",
        color: "#e4e2de",
        padding: "10px",
    },

    problemsGrid: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        marginTop:"30px",
    },

    headingButtonContainer: {
        display:"flex",
        justifyContent: "flex-end",
    },

    headingTitle:{
    },
    
}));
