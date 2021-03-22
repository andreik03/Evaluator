import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({

    typography: {
        padding: theme.spacing(2),
    },

    codeEditorLeftPanel: {
        display: "flex",
        paddingTop: "25px",
        margin: "0 0 20px 0",
        justifyContent: "space-between",
    },

    codeEditorRightPanel: {
        display: "flex",
        flexDirection: "column",
    },

    codeEditorProps: {
        color: "#e4e2de",
        fontSize: "17px",
        fontFamily: "SourceCodePro, monospace",
    },

    codeEditonButton: {
        background: "#ff941a",
        color: "#e4e2de",
        fontWeight: "bold",
        marginRight: "15px",
    },

    codeEditorOutput: {
        justifySelf: "flex-end",
        background: "rgb(57 72 103)",
        width: "13vw",
        padding: "15px",
    },

    codeEditorUserCode: {
        width: "36vw",
        flexGrow: 1,
    },

    codeEditorInput: {
        paddingTop: "14px",
        flexGrow: 1,
    },

    codeEditorInputContainer: {
        display: "flex",
        justifyContent: "space-between",
    },

    codeEditorButtonSend: {
        background: "#ff941a",
        color: "#e4e2de",
        fontWeight: "bold",
        height: "30px",
        alignSelf: "flex-end",
        marginLeft: "10px"
    },

    codeEditorButtonContainer: {
        padding: "0 0 15px 0",
    },

    codeIsCorrect: {
        color: "green",
        fontWeight: "bold",
    },

    codeIsWrong: {
        color: "red",
        fontSize: "17px",
        fontWeight: "bold",
    },
}));
