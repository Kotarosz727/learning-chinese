import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TextField, Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Head from "../../components/head";
import aws_cognito from "../../src/interactors/AWS/aws_cognito";
import Amplify, { Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import FacebookIcon from "@material-ui/icons/Facebook";
import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import HelpIcon from "@material-ui/icons/Help";

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
    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const router = useRouter();

    const styles: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        textAlign: "center" as "center",
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
        marginTop: "1.5rem",
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
                <div>
                    <div style={{ marginBottom: 20, marginTop: 10 }}>
                        <span style={{ fontSize: 25, fontWeight: "bold" }}>会员登录</span>
                        <span onClick={handleClickOpen} style={{ marginLeft: 15, cursor: "help"}}>
                            <HelpIcon />
                        </span>
                    </div>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title">
                            会員登録をすると下記の機能をご利用いただけます。
                            <br />
                            (*無料です)
                        </DialogTitle>
                        <DialogContent dividers>
                            <ul>
                                <li>ブックマーク</li>
                                <li>ランダム表示</li>
                            </ul>
                        </DialogContent>
                        <DialogActions>
                            <div onClick={handleClose} style={{ cursor: "default" }}>
                                close
                            </div>
                        </DialogActions>
                    </Dialog>
                </div>
                <FormControl>
                    <InputLabel htmlFor="username">ユーザー名</InputLabel>
                    <Input
                        error={errorToggleForName}
                        id="username"
                        style={{ width: 400, position: "relative" }}
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
                        style={{ width: 400, position: "relative" }}
                        type="password"
                        onChange={handlePassword}
                        autoComplete="on"
                    />
                    <FormHelperText id="password">{errorMsgForPassword}</FormHelperText>
                </FormControl>
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
                        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Amazon })}
                    >
                        Amazonで会員登録
                    </Button>
                </div>
            </div>
        </>
    );
}
