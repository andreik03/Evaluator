import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useScript from "../hooks/useScript";
import { Solution } from "../models/solution.model";
import { useStyles } from "./styles/code-editor.styles";
import ApiService from "../services/api-service";
import { Problem } from "../models/problem.model";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"

declare const BrythonRunner: any;

type Props = {
    problem: Problem;
}

type FilesType = {
    [index: string]: {
        type: string;
        body: string;
    };
}

const CodeEditor = (props: Props) => {

    const classes = useStyles()
    const [codeOutput, setCodeOutput] = useState("");
    const [isCorrect, setIsCorrect] = useState("empty");
    const [editorCode, setEditorCode] = useState("empty");

    useEffect(() => {
        setEditorCode(props.problem.default_code)
    }, [props])

    // Brython Runner script for running integrated Python 3.9.0 in the web browser
    useScript("https://cdn.jsdelivr.net/gh/pythonpad/brython-runner/lib/brython-runner.bundle.js");

    let next = false; // this is to be changed on user input

    let currentInput = "";

    const files: FilesType = {
        'OUTPUT_PATH': {
            'type': 'text',
            'body': '',
        },
    };

    async function runPythonCode() {

        const timeout = async (ms: any) => new Promise(res => setTimeout(res, ms));

        async function waitUserInput() {

            while (next === false) await timeout(50); // pause script but avoid browser to freeze ;)
            next = false; // reset var
        }

        const runner = new BrythonRunner({
            onFileUpdate(filename: any, data: any) {
                files[filename].type = data.type;
                files[filename].body = data.body;
            },
            stdout: {
                write(content: string) {
                    //empty
                },
                flush() { },
            },
            stderr: {
                write(content: string) {
                    errors = content;
                },
                flush() { },
            },
            stdin: {
                async readline() {
                    await waitUserInput();
                    return currentInput;
                },
            }
        });

        files['OUTPUT_PATH'].body = "";
        let errors = "";

        await runner.runCodeWithFiles(editorCode, files);
        setCodeOutput(files['OUTPUT_PATH'].body + errors);
    }

    async function checkPythonCode() {
        const runner = new BrythonRunner({
            onFileUpdate(filename: any, data: any) {
                files[filename].type = data.type;
                files[filename].body = data.body;
            },
            stdout: {
                write(content: string) {
                    //empty
                },
                flush() { },
            },
            stderr: {
                write(content: string) {
                    //empty
                },
                flush() { },
            },
            stdin: {
                async readline() {
                    return input[inputIdx++];
                },
            }
        });

        const solutions: Array<Solution> = await ApiService.getSolutionsById(props.problem.id);

        let input: Array<string> = [];
        let inputIdx = 0;
        let successfull = true;
        files['main.py'].body = editorCode;
        // files['main.py'].body = editorTextRef.current!.value;

        for (let solution of solutions) {
            input = solution.test.split(' ');
            inputIdx = 0;
            files['OUTPUT_PATH'].body = "";

            await runner.runCodeWithFiles(files['main.py'].body, files);
            if (files['OUTPUT_PATH'].body !== solution.answer) {
                successfull = false;
                break;
            }
        }

        setIsCorrect(successfull ? "yes" : "no");
    }

    return (
        <Container>
            <Grid container className={classes.codeEditorLeftPanel}>
                <Grid item>
                    <AceEditor
                        key={props.problem.id}
                        mode="python"
                        theme="monokai"
                        onChange={(newCode) => setEditorCode(newCode)}
                        name="Ace_Code_Editor"
                        defaultValue={props.problem.default_code}
                        fontSize={16}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        editorProps={{ $blockScrolling: Infinity }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                        }}

                    />
                    {/* <TextField
                        key={props.problem.id}
                        multiline
                        rows={16}
                        variant="outlined"
                        color="primary"
                        inputProps={{ className: classes.codeEditorProps }}
                        className={`${classes.codeEditorUserCode} language-python`}
                        defaultValue={editorCode}
                        onChange={(e) => setEditorCode(e.target.value)}
                    /> */}
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
                    <Button variant="contained" className={classes.codeEditorButton} onClick={() => runPythonCode()}>Run Code</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" className={classes.codeEditorButton} onClick={() => checkPythonCode()}>Check Code</Button>
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