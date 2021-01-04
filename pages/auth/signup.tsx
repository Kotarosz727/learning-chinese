import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TextField, Button } from "@material-ui/core";
import Head from "../head";
import aws_cognito from "../../src/interactors/AWS/aws_cognito";

export default function signup(): JSX.Element {
    const [name, setName] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");
    const [errorMsgForName, setErrorMsgForName] = useState<string | null>("");
    const [errorMsgForPassword, setErrorMsgForPassword] = useState<string>(
        "8文字以上、1つ以上の半角数字を含めてください"
    );
    const [errorToggleForName, setErrorToggleForName] = useState<boolean | null>(false);
    const [errorToggleForPassword, setErrorToggleForPassword] = useState<boolean | null>(false);
    const [isTranslate, toggleTranslate] = useState<boolean | null>(false);
    const router = useRouter();

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };

    const styles: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        textAlign: "center" as "center",
        marginTop: "10rem",
        height: 300,
        width: 500,
        border: "2px solid #ccc",
        borderRadius: "1rem",
        position: "relative",
    };

    const button_style: React.CSSProperties = {
        marginTop: "2rem",
    };

    const signUp = async (): Promise<void> => {
        try {
            await new aws_cognito().cognito_signUp(name, password);
            alert("会員登録いただきありがとうございます。管理者の認証をお待ちください。");
            router.push("/");
        } catch (error) {
            if (error == "nonameException") {
                setErrorMsgForName("ユーザー名を入力してください");
                setErrorToggleForName(true);
            }
            if (error == "noPasswordException") {
                setErrorMsgForPassword("パスワードを入力してください");
                setErrorToggleForPassword(true);
            }
            if (error == "shortPasswordException") {
                setErrorMsgForPassword("パスワードは8文字以上を入力してください");
                setErrorToggleForPassword(true);
            }
            if (error.name == "UsernameExistsException") {
                setErrorMsgForName("ユーザー名はすでに登録されています");
                setErrorToggleForName(true);
            }
            if (error.message == "Password did not conform with policy: Password must have numeric characters") {
                setErrorMsgForPassword("パスワードには数字を含めてください");
                setErrorToggleForPassword(true);
            }
            console.log("error signing up:", error);
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
                <Button
                    style={button_style}
                    variant="contained"
                    color="primary"
                    onClick={(): Promise<void> => signUp()}
                >
                    登録
                </Button>
            </div>
        </>
    );
}