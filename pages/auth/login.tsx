import React, { useState, useEffect, useContext } from "react";
import Amplify, { Auth } from "aws-amplify";
import { TextField, Button } from "@material-ui/core";
import Head from "../../components/head";
import { useRouter } from "next/router";
import aws_cognito from "../../src/interactors/AWS/aws_cognito";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import FacebookIcon from "@material-ui/icons/Facebook";

export default function login() {
    type strOrNull = string | null;
    const [name, setName] = useState<strOrNull>("");
    const [password, setPassword] = useState<strOrNull>("");
    const [errorMsgForName, setErrorMsgForName] = useState<strOrNull>("");
    const [errorMsgForPassword, setErrorMsgForPassword] = useState<strOrNull>("");
    const [errorToggleForName, setErrorToggleForName] = useState<boolean>(false);
    const [errorToggleForPassword, setErrorToggleForPassword] = useState<boolean>(false);
    const router = useRouter();

    const styles: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "10rem",
        height: 500,
        width: 500,
        border: "2px solid #ccc",
        borderRadius: "1rem",
        position: "relative",
    };

    const button_style: React.CSSProperties = {
        marginTop: "2rem",
    };
    const facebook_button_style: React.CSSProperties = {
        marginTop: "1rem",
        color: "white",
        backgroundColor: "#2b9ce3",
        width: 220,
    };
    const google_button_style: React.CSSProperties = {
        marginTop: "0.8rem",
        color: "white",
        backgroundColor: "#cf2960",
        width: 220,
    };
    const amazon_button_style: React.CSSProperties = {
        marginTop: "0.8rem",
        color: "white",
        backgroundColor: "#f5ca49",
        width: 220,
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };

    const login = async (): Promise<void> => {
        const res = await new aws_cognito().cognito_login(name, password);
        if (res === true) {
            alert("Hi !");
            router.push("/");
        }
        if (typeof res === "object") {
            if (res.kind === "name") {
                setErrorMsgForName(res.msg);
                setErrorToggleForName(true);
            } else if (res.kind === "password") {
                setErrorMsgForPassword(res.msg);
                setErrorToggleForPassword(true);
            } else if (res.kind === "both") {
                setErrorMsgForName(res.msg);
                setErrorToggleForName(true);
                setErrorMsgForPassword(res.msg);
                setErrorToggleForPassword(true);
            }
        }
    };

    return (
        <>
            <Head title={"ログイン"}></Head>
            <div style={styles}>
                <h2>ログイン</h2>
                <div>
                    <TextField
                        id="username"
                        error={errorToggleForName}
                        style={{ width: 400, marginBottom: "2rem", position: "relative" }}
                        label="ユーザー名"
                        helperText={errorMsgForName}
                        onChange={handleName}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        error={errorToggleForPassword}
                        style={{ width: 400, position: "relative" }}
                        label="パスワード"
                        type="password"
                        helperText={errorMsgForPassword}
                        onChange={handlePassword}
                    />
                </div>
                <div>
                    <Button style={button_style} variant="contained" color="primary" onClick={login}>
                        ログイン
                    </Button>
                </div>
                <div>
                    <Button
                        style={facebook_button_style}
                        variant="contained"
                        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}
                    >
                        <FacebookIcon style={{ marginRight: 3 }} />
                        Facebookでログイン
                    </Button>
                </div>
                <div>
                    <Button
                        style={google_button_style}
                        variant="contained"
                        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
                    >
                        Googleでログイン
                    </Button>
                </div>
                <div>
                    <Button
                        style={amazon_button_style}
                        variant="contained"
                        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Amazon })}
                    >
                        Amazonでログイン
                    </Button>
                </div>
            </div>
        </>
    );
}
