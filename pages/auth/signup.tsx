import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TextField, Button } from "@material-ui/core";
import Head from "../../components/head";
import aws_cognito from "../../src/interactors/AWS/aws_cognito";
import Amplify, { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import FacebookIcon from "@material-ui/icons/Facebook";
import Image from "next/image";

export default function signup(): JSX.Element {
    const [name, setName] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");
    const [errorMsgForName, setErrorMsgForName] = useState<string | null>("");
    const [errorMsgForPassword, setErrorMsgForPassword] = useState<string>(
        "8文字以上、1つ以上の半角数字を含めてください"
    );
    const [errorToggleForName, setErrorToggleForName] = useState<boolean>(false);
    const [errorToggleForPassword, setErrorToggleForPassword] = useState<boolean>(false);
    const [isTranslate, toggleTranslate] = useState<boolean>(false);
    const router = useRouter();

    const styles: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        textAlign: "center" as "center",
        marginTop: "10rem",
        height: 450,
        width: 500,
        border: "2px solid #ccc",
        borderRadius: "1rem",
        position: "relative",
    };
    const button_style: React.CSSProperties = {
        marginTop: "2rem",
    };
    const facebook_button_style: React.CSSProperties = {
        marginTop: "0.8rem",
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
    const signUp = async (): Promise<void> => {
        type error_object = {
            kind: string;
            msg: string;
        };
        const res: true | error_object = await new aws_cognito().cognito_signUp(name, password);
        if (res === true) {
            alert("会員登録いただきありがとうございます。管理者の認証をお待ちください。");
            router.push("/");
        } else if (typeof res === "object") {
            if (res.kind === "name") {
                setErrorMsgForName(res.msg);
                setErrorToggleForName(true);
            } else if (res.kind === "password") {
                setErrorMsgForPassword(res.msg);
                setErrorToggleForPassword(true);
            }
        }
    };

    return (
        <>
            <Head title="会員登録"></Head>
            <div style={styles}>
                <div onMouseOver={(): void => toggleTranslate(!isTranslate)}>
                    {isTranslate ? <h2>会员登录</h2> : <h2>会員登録</h2>}
                </div>
                <div>
                    <TextField
                        error={errorToggleForName}
                        id="username"
                        style={{ width: 400, marginBottom: "2rem", position: "relative" }}
                        label="ユーザー名"
                        helperText={errorMsgForName}
                        onChange={handleName}
                    />
                </div>
                <div>
                    <TextField
                        error={errorToggleForPassword}
                        id="password"
                        style={{ width: 400, position: "relative" }}
                        label="パスワード"
                        type="password"
                        helperText={errorMsgForPassword}
                        onChange={handlePassword}
                    />
                </div>
                <div>
                    <Button
                        style={button_style}
                        variant="contained"
                        color="primary"
                        onClick={(): Promise<void> => signUp()}
                    >
                        登録
                    </Button>
                </div>
                <div>
                    <Button
                        style={facebook_button_style}
                        variant="contained"
                        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}
                    >
                        <FacebookIcon style={{ marginRight: 3 }} />
                        Facebookで会員登録
                    </Button>
                </div>
                <div>
                    <Button
                        style={google_button_style}
                        variant="contained"
                        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
                    >
                        Googleで会員登録
                    </Button>
                </div>
                <div>
                    <Button
                        style={amazon_button_style}
                        variant="contained"
                        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Amazon})}
                    >
                        Amazonで会員登録
                    </Button>
                </div>
            </div>
        </>
    );
}
