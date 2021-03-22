import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import useScript from "../hooks/useScript";
import { Solution } from "../models/solution.model";
import { useStyles } from "./styles/code-editor.styles";
import ApiService from "../services/api-service";
import React from "react";

declare const BrythonRunner: any;

type Props = {
    id: number;
}

const CodeEditor = (props: Props) => {

    const classes = useStyles()
    const [codeOutput, setCodeOutput] = useState("");
    const [isCorrect, setIsCorrect] = useState("empty");

    // Brython Runner script for running integrated Python 3.9.0 in the web browser
    useScript("https://cdn.jsdelivr.net/gh/pythonpad/brython-runner/lib/brython-runner.bundle.js");

    let next = false; // this is to be changed on user input

    async function runPythonCode() {

        const timeout = async (ms: any) => new Promise(res => setTimeout(res, ms));

        async function waitUserInput() {

            while (next === false) await timeout(50); // pause script but avoid browser to freeze ;)
            next = false; // reset var
        }

        const runner = new BrythonRunner({
            stdout: {
                write(content: string) {
                    setCodeOutput(`${codeOutput}${content}\n`)
                },
                flush() { },
            },
            stderr: {
                write(content: string) {
                    setCodeOutput(`${codeOutput}${content}\n`)
                },
                flush() { },
            },
            stdin: {
                async readline() {
                    // setCodeOutput(`${codeOutput}Waiting on input...\n`);
                    await waitUserInput();
                    return currentInput;
                },
            }
        });

        await runner.runCode(currentCode);
    }

    async function checkPythonCode() {
        const runner = new BrythonRunner({
            stdout: {
                write(content: string) {
                    currentOutput += content.trim();
                },
                flush() { },
            },
            stderr: {
                write(content: string) {
                    currentOutput += content.trim();
                },
                flush() { },
            },
            stdin: {
                async readline() {
                    return input[inputIdx++];
                },
            }
        });

        const solutions: Array<Solution> = await ApiService.getSolutionsById(props.id);

        let currentOutput = "";
        let input: Array<string> = [];
        let inputIdx = 0;
        let successfull = true;

        for (let solution of solutions) {
            input = solution.test.split(' ');
            inputIdx = 0;
            currentOutput = "";
            await runner.runCode(currentCode);

            if (currentOutput !== solution.answer) {
                successfull = false;
                break;
            }
        }

        setIsCorrect(successfull ? "yes" : "no");
    }

    let currentCode = "";
    let currentInput = "";

    return (
        <Container>
            <Grid container className={classes.codeEditorLeftPanel}>
                <Grid item>
                    <TextField
                        multiline
                        rows={16}
                        variant="outlined"
                        color="primary"
                        inputProps={{ className: classes.codeEditorProps }}
                        className={classes.codeEditorUserCode}
                        onChange={(e) => currentCode = e.target.value}
                    />
                </Grid>
                <Grid item className={classes.codeEditorRightPanel}>
                    <TextField
                        multiline
                        disabled
                        rows={13}
                        color="primary"
                        inputProps={{ className: classes.codeEditorProps }}
                        className={classes.codeEditorOutput}
                        defaultValue={codeOutput}
                    />

                    <Grid container className={classes.codeEditorInputContainer}>
                        <TextField
                            inputProps={{ className: classes.codeEditorProps }}
                            className={classes.codeEditorInput}
                            onChange={(e) => currentInput = e.target.value}
                        />
                        <Button variant="contained" className={classes.codeEditorButtonSend} onClick={() => next = true}>Send</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.codeEditorButtonContainer} alignItems="center">
                <Grid item>
                    <Button variant="contained" className={classes.codeEditonButton} onClick={() => runPythonCode()}>Run Code</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" className={classes.codeEditonButton} onClick={() => checkPythonCode()}>Check Code</Button>
                </Grid>
                <Grid item>
                    {
                        isCorrect !== "empty" && (isCorrect === "yes" ?
                            <Typography className={classes.codeIsCorrect}>The code is correct!</Typography>
                            :
                            <Typography className={classes.codeIsWrong}>The code is wrong!</Typography>)
                    }
                </Grid>
            </Grid>
        </Container >
    );
}

export default CodeEditor;