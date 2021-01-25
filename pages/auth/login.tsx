import React, { useState, useEffect, useContext } from "react";
import Amplify, { Auth } from "aws-amplify";
import { TextField, Button } from "@material-ui/core";
import Head from "../../components/head";
import { useRouter } from "next/router";
import aws_cognito from "../../src/interactors/AWS/aws_cognito";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import FacebookIcon from "@material-ui/icons/Facebook";
import Link from "next/link";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import styles from "./form.module.css";

export default function login() {
    type strOrNull = string | null;
    const [name, setName] = useState<strOrNull>("");
    const [password, setPassword] = useState<strOrNull>("");
    const [errorMsgForName, setErrorMsgForName] = useState<strOrNull>("");
    const [errorMsgForPassword, setErrorMsgForPassword] = useState<strOrNull>("");
    const [errorToggleForName, setErrorToggleForName] = useState<boolean>(false);
    const [errorToggleForPassword, setErrorToggleForPassword] = useState<boolean>(false);
    const router = useRouter();

    const button_style: React.CSSProperties = {
        marginTop: "2rem",
    };
    const facebook_button_style: React.CSSProperties = {
        marginTop: "2rem",
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
            <div className={styles.form}>
                <h2>ログイン</h2>
                <FormControl>
                    <InputLabel htmlFor="username">ユーザー名</InputLabel>
                    <Input
                        error={errorToggleForName}
                        id="username"
                        className={styles.input}
                        onChange={handleName}
                    />
                    <FormHelperText id="username">{errorMsgForName}</FormHelperText>
                </FormControl>
                <FormControl></FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">パスワード</InputLabel>
                    <Input
                        error={errorToggleForPassword}
                        id="password"
                        className={styles.input}
                        type="password"
                        onChange={handlePassword}
                        autoComplete="on"
                    />
                    <FormHelperText id="password">{errorMsgForPassword}</FormHelperText>
                </FormControl>
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
                <div style={{ textAlign: "left", marginTop: 25, marginLeft: 40 }}>
                    <Link href="/auth/signup">
                        <a>Create account(Free)</a>
                    </Link>
                </div>
            </div>
        </>
    );
}
