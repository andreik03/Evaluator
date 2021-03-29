import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useScript from "../hooks/useScript";
import { Solution } from "../models/solution.model";
import { useStyles } from "./styles/code-editor.styles";
import ApiService from "../services/api-service";
import { Problem } from "../models/problem.model";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import ace from "ace-builds"

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
    const [placeHolderInput, setPlaceHolderInput] = useState("")

    // settings for Ace to webpack
    ace.config.set(
        "basePath",
        "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/"
    )

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
                console.log(files)
            },
            stdout: {
                write(content: string) {
                    //empty
                    console.log(content)
                },
                flush() { },
            },
            stderr: {
                write(content: string) {
                    console.log(content)
                    errors += content;
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
                    console.log(inputs[inputIdx])
                    return inputs[inputIdx++];
                },
            }
        });

        const solutions: Array<Solution> = await ApiService.getSolutionsById(props.problem.id);

        let inputs: Array<string> = [];
        let inputIdx = 0;
        let successfull = true;

        for (let solution of solutions) {
            inputs = solution.test.split('\n');
            console.log(inputs)
            inputIdx = 0;
            files['OUTPUT_PATH'].body = "";

            await runner.runCodeWithFiles(editorCode, files);
            if (files['OUTPUT_PATH'].body !== solution.answer) {
                successfull = false;
                break;
            }
        }

        setIsCorrect(successfull ? "yes" : "no");
    }

    return (
        <Grid container className={classes.codeEditorBody} spacing={1}>
            <Grid item className={classes.codeEditorPanelLeft}>
                <AceEditor
                    key={props.problem.id}
                    mode="python"
                    theme="monokai"
                    onChange={(newCode) => setEditorCode(newCode)}
                    name="Ace_Code_Editor"
                    defaultValue={props.problem.default_code}
                    fontSize={16}
                    width="700px"
                    showPrintMargin={false}
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
            </Grid>
            <Grid item className={classes.codeEditorRightPanel}>
                <TextField
                    multiline
                    disabled
                    color="primary"
                    InputProps={{ disableUnderline: true }}
                    inputProps={{ className: classes.codeEditorOutputProps }}
                    className={classes.codeEditorOutput}
                    defaultValue={codeOutput}
                />

                <Grid item className={classes.codeEditorInputContainer}>
                    <TextField
                        InputProps={{ className: classes.codeEditorOutputProps, disableUnderline: true }}
                        className={classes.codeEditorInputField}
                        placeholder={placeHolderInput}
                        onChange={(e) => currentInput = e.target.value}
                    />
                    <Button variant="outlined" className={classes.codeEditorButtonSend} onClick={() => next = true}>Send</Button>
                </Grid>
                <Grid container className={classes.codeEditorButtonsContainer} >
                    <Button variant="outlined" className={classes.codeEditorButton} onClick={() => runPythonCode()}>Run Code</Button>
                    <Button variant="outlined" className={classes.codeEditorButton} onClick={() => checkPythonCode()}>Check Code</Button>
                    {
                        isCorrect !== "empty" && (isCorrect === "yes" ?
                            <Typography className={classes.codeIsCorrect}>Correct!</Typography>
                            :
                            <Typography className={classes.codeIsWrong}>Wrong!</Typography>)
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CodeEditor;