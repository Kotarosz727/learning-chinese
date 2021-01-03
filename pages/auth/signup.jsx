import React, { useState, useEffect, useContext } from "react";
import Amplify, { Auth } from "aws-amplify";
import { TextField, Button } from "@material-ui/core";
import Head from "../head";

export default function signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsgForName, setErrorMsgForName] = useState("");
    const [errorMsgForPassword, setErrorMsgForPassword] = useState("8文字以上、1つ以上の半角数字を含めてください");
    const [errorToggleForName, setErrorToggleForName] = useState(false);
    const [errorToggleForPassword, setErrorToggleForPassword] = useState(false);
    const [translate, toggleTranslate] = useState(false);

    function handleName(e) {
        setName(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

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

    async function aws_signUP() {
        try {
            validateName(name);
            validatePassword(password);
            const { user } = await Auth.signUp({
                password: password,
                username: name,
                attributes: {
                    name: name,
                },
            });
            console.log("ok:", user);
        } catch (e) {
            if (e == "nonameException") {
                setErrorMsgForName("ユーザー名を入力してください");
                setErrorToggleForName(true);
            }
            if (e == "noPasswordException") {
                setErrorMsgForPassword("パスワードを入力してください");
                setErrorToggleForPassword(true);
            }
            if (e == "shortPasswordException") {
                setErrorMsgForPassword("パスワードは8文字以上を入力してください");
                setErrorToggleForPassword(true);
            }
            if (e.name == "UsernameExistsException") {
                setErrorMsgForName("ユーザー名はすでに登録されています");
                setErrorToggleForName(true);
            }
            if (e.message == "Password did not conform with policy: Password must have numeric characters") {
                setErrorMsgForPassword("パスワードには数字を含めてください");
                setErrorToggleForPassword(true);
            }
            console.log("error signing up:", e);
        }
    }

    function validateName(name) {
        if (!name) {
            throw "nonameException";
        }
    }

    function validatePassword(password) {
        if (!password) {
            throw "noPasswordException";
        }
        if (password.length < 8) {
            throw "shortPasswordException";
        }
    }

    return (
        <>
            <Head title="会員登録"></Head>
            <div style={styles}>
                <div onMouseOver={() => toggleTranslate(!translate)}>{translate ? <h2>会员登录</h2> : <h2>会員登録</h2>}</div>
                <div>
                    <TextField
                        error={errorToggleForName}
                        id="username"
                        style={{ width: 400, marginBottom: "2rem", positon: "relative" }}
                        label="ユーザー名"
                        helperText={errorMsgForName}
                        onChange={handleName}
                    />
                </div>
                <div>
                    <TextField
                        error={errorToggleForPassword}
                        id="password"
                        style={{ width: 400, positon: "relative" }}
                        label="パスワード"
                        type="password"
                        helperText={errorMsgForPassword}
                        onChange={handlePassword}
                    />
                </div>
                <Button style={button_style} variant="contained" color="primary" onClick={aws_signUP}>
                    登録
                </Button>
            </div>
        </>
    );
}
