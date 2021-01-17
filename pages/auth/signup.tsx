import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TextField, Button } from "@material-ui/core";
import Head from "../../components/head";
import aws_cognito from "../../src/interactors/AWS/aws_cognito";
import Amplify, { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

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

    // useEffect(() => {
    //     Hub.listen("auth", ({ payload: { event, data } }) => {
    //         switch (event) {
    //             case "signIn":
    //                 this.setState({ user: data });
    //                 break;
    //             case "signOut":
    //                 this.setState({ user: null });
    //                 break;
    //             case "customOAuthState":
    //                 this.setState({ customState: data });
    //         }
    //     });

    //     Auth.currentAuthenticatedUser()
    //         .then((user) => this.setState({ user }))
    //         .catch(() => console.log("Not signed in"));
    // });

    const styles: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        textAlign: "center" as "center",
        marginTop: "10rem",
        height: 350,
        width: 500,
        border: "2px solid #ccc",
        borderRadius: "1rem",
        position: "relative",
    };
    const button_style: React.CSSProperties = {
        marginTop: "2rem",
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
            <div id="fb-root" style={styles}>
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
                <div
                    className="fb-login-button"
                    data-width=""
                    data-size="medium"
                    data-button-type="login_with"
                    data-layout="default"
                    data-auto-logout-link="false"
                    data-use-continue-as="false"
                ></div>
                <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}>
                    FaceBookログイン
                </button>
            </div>
        </>
    );
}
