import React, { useState, useEffect, useContext } from "react";
import Amplify, { Auth } from "aws-amplify";
import { TextField, Button } from "@material-ui/core";
import Head from "../head";
import { useRouter } from "next/router";

export default function login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsgForName, setErrorMsgForName] = useState("");
    const [errorMsgForPassword, setErrorMsgForPassword] = useState("");
    const [errorToggleForName, setErrorToggleForName] = useState(false);
    const [errorToggleForPassword, setErrorToggleForPassword] = useState(false);
    const router = useRouter();

    const styles = {
        display: "block",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "10rem",
        height: 300,
        width: 500,
        border: "2px solid #ccc",
        borderRadius: "1rem",
        positon: "relative",
    };

    const button_style = {
        marginTop: "2rem",
    };

    function handleName(e) {
        setName(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function aws_login() {
        try {
            validateName(name);
            validatePassword(password);
            const user = await Auth.signIn(name, password);
            router.push("/");
        } catch (e) {
            console.log("error signing in", e);
            if (e === "noNameException") {
                setErrorMsgForName("ユーザー名を入力してください");
                setErrorToggleForName(true);
            }
            if (e === "noPasswordException") {
                setErrorMsgForPassword("パスワードを入力して下さい");
                setErrorToggleForPassword(true);
            }
            if (e.name === "UserNotFoundException") {
                setErrorMsgForName("ユーザーが存在しません");
                setErrorToggleForName(true);
            }
            if (e.name === "NotAuthorizedException") {
                setErrorMsgForName("ユーザー名またはパスワードが違います");
                setErrorToggleForName(true);
                setErrorMsgForPassword("ユーザー名またはパスワードが違います");
                setErrorToggleForPassword(true);
            }
        }
    }

    function validateName(name) {
        if (!name) {
            throw "noNameException";
        }
    }
    function validatePassword(password) {
        if (!password) {
            throw "noPasswordException";
        }
    }

    return (
        <>
            <Head title={"ログイン"}></Head>
            <div style={styles}>
                <h2>ログイン</h2>
                <div>
                    <TextField
                        id="username"
                        error={errorToggleForName}
                        style={{ width: 400, marginBottom: "2rem", positon: "relative" }}
                        label="ユーザー名"
                        helperText={errorMsgForName}
                        onChange={handleName}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        error={errorToggleForPassword}
                        style={{ width: 400, positon: "relative" }}
                        label="パスワード"
                        type="password"
                        helperText={errorMsgForPassword}
                        onChange={handlePassword}
                    />
                </div>
                <Button style={button_style} variant="contained" color="primary" onClick={aws_login}>
                    ログイン
                </Button>
            </div>
        </>
    );
}
