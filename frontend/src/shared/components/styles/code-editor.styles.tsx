import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({

    typography: {
        padding: theme.spacing(2),
    },

    codeEditorBody: {
        display: "flex",
        justifyContent: "center",
    },

    codeEditorRightPanel: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        maxWidth: "700px",
    },

    codeEditorOutputProps: {
        color: "white",
        fontSize: "17px",
        fontFamily: "SourceCodePro, monospace",
    },

    codeEditorButton: {
        background: "#333333",
        color: "#e4e2de",
        fontWeight: "bold",
        marginRight: "8px"
    },

    codeEditorOutput: {
        background: "#202020",
        padding: "15px",
        flexGrow: 1,
        minHeight: "200px"
    },

    codeEditorUserCode: {
        width: "36vw",
        flexGrow: 1,
    },

    codeEditorInputField: {
        background: "#2d2d2d",
        flexGrow: 1,
        padding:"3px 0px 0px 10px",
    },

    codeEditorInputContainer: {
        display: "flex",
        margin: "8px 0 8px 0",
    },

    codeEditorButtonSend: {
        background: "#3f4344",
        color: "#e4e2de",
        fontWeight: "bold",
        alignSelf: "flex-end",
        marginLeft: "6px",
    },

    codeEditorButtonsContainer: {
    },

    codeIsCorrect: {
        color: "green",
        fontWeight: "bold",
        justifySelf: "center",
        alignSelf: "center",
        marginLeft:"5px",
    },

    codeIsWrong: {
        color: "red",
        fontWeight: "bold",
        justifySelf: "center",
        alignSelf: "center",
        marginLeft: "8px",
    },
    codeEditorPanelLeft: {

    },
}));
