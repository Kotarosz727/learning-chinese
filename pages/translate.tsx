import React, { useState, useContext, useEffect } from "react";
import Head from "../components/head";
import styles from "../styles/Home.module.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SpeakerIcon from "@material-ui/icons/Speaker";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import { UserContext } from "../UserContext";

export default function Translate() {
    const url: string = process.env.GAS_URL;
    const url_note: string = process.env.LAMBDA_URL_FRONT;
    const user_id: string = useContext(UserContext);
    const [chinese, setChinese] = useState<string>("");
    const [japanese, setJapanese] = useState<string>("");
    const [speaker, setSpeaker] = useState<boolean>(false);
    const [addBtn, setAddBtn] = useState<boolean>(false);
    const [pageToggle, doToggle] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const mystyle: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "15rem",
        height: "320px",
        width: "300px",
        border: "2px solid #ccc",
        borderRadius: "1rem",
        position: "relative",
    };

    const textField = {
        width: 250,
    };

    const speak = (value): void => {
        responsiveVoice.speak(value, "Chinese Female");
    };

    const translateToChinese = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const elm = document.getElementById("ch");
        elm.innerText = "";
        const japaneseText = e.currentTarget.value;
        const urlWithParams = url + "?" + "text=" + japaneseText + "&source=ja" + "&target=zh-cn";
        const res = await fetch(urlWithParams);
        const json: string = await res.json();
        elm.innerText = json;
        setJapanese(japaneseText);
        setChinese(json);
        setSpeaker(true);
        setAddBtn(true);
    };

    const translateToJapanese = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const elm = document.getElementById("jpn");
        elm.innerText = "";
        const chineseText = e.currentTarget.value;
        const urlWithParams = url + "?" + "text=" + chineseText + "&source=zh-cn" + "&target=ja";
        const res = await fetch(urlWithParams);
        const json: string = await res.json();
        elm.innerText = json;
        setJapanese(chineseText);
        setChinese(json);
        setAddBtn(true);
    };

    const postNote = async () => {
        const myjapanese = (document.getElementById("myjapanese") as HTMLInputElement).value;
        const mychinese = (document.getElementById("mychinese") as HTMLInputElement).value;
        const mypinin = (document.getElementById("mypinin") as HTMLInputElement).value;
        const data = {
            myjapanese: myjapanese,
            mychinese: mychinese,
            mypinin: mypinin,
        };
        const res = await new ChineseInterator().postNote(data, user_id, url_note);
        alert("単語帳に追加しました。");
        setOpen(false);
    };

    let pageContent = (
        <>
            <div style={{ marginBottom: 20, marginTop: 25 }}>
                <span>日本語　</span>
                <SyncAltIcon onTouchStart={() => doToggle(!pageToggle)} onMouseDown={() => doToggle(!pageToggle)} />
                <span>　中国語</span>
            </div>
            <div>
                <TextareaAutosize
                    aria-label="minimum height"
                    style={textField}
                    rowsMin={5}
                    placeholder="日本語"
                    onBlur={translateToChinese}
                />
            </div>
            <div>
                <TextareaAutosize
                    id="ch"
                    aria-label="minimum height"
                    style={textField}
                    rowsMin={5}
                    placeholder="中国語"
                />
            </div>
        </>
    );
    if (pageToggle) {
        pageContent = (
            <>
                <div style={{ marginBottom: 20, marginTop: 25 }}>
                    <span>中国語　</span>
                    <SyncAltIcon onTouchStart={() => doToggle(!pageToggle)} onMouseDown={() => doToggle(!pageToggle)} />
                    <span>　日本語</span>
                </div>
                <div>
                    <TextareaAutosize
                        aria-label="minimum height"
                        style={textField}
                        rowsMin={5}
                        placeholder="中国語"
                        onBlur={translateToJapanese}
                    />
                </div>
                <div>
                    <TextareaAutosize
                        id="jpn"
                        aria-label="minimum height"
                        style={textField}
                        rowsMin={5}
                        placeholder="日本語"
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                <div style={mystyle}>
                    {pageContent}
                    <div>
                        {speaker && !pageToggle ? (
                            <SpeakerIcon
                                color="action"
                                fontSize="large"
                                style={{ position: "absolute", left: "1.3rem", bottom: "0.7rem" }}
                                onTouchStart={() => speak(chinese)}
                                onMouseDown={() => speak(chinese)}
                            />
                        ) : (
                            ""
                        )}
                        {addBtn ? (
                            <AddCircleIcon
                                onClick={handleClickOpen}
                                color="secondary"
                                fontSize="large"
                                style={{ position: "absolute", right: "1.3rem", bottom: "0.7rem" }}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">単語帳へ追加</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mychinese"
                        label="中国語"
                        value={chinese}
                        style={{ width: 300 }}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="myjapanese"
                        label="日本語"
                        value={japanese}
                        style={{ width: 300 }}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mypinin"
                        label="pinin"
                        placeholder="空欄でも可"
                        style={{ width: 300 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={postNote} color="primary" style={{ right: "1.2rem" }}>
                        追加
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
