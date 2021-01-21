import React, { useState, useContext, useEffect } from "react";
import Head from "../components/head";
import styles from "../styles/Home.module.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SpeakerIcon from "@material-ui/icons/Speaker";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

export default function Translate() {
    const url: string = process.env.GAS_URL;
    const [chinese, setChinese] = useState<string>("");
    const [speaker, setSpeaker] = useState<boolean>(false);
    const [pageToggle, doToggle] = useState<boolean>(false);
    const mystyle: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "15rem",
        height: "500px",
        borderRadius: "1rem",
        position: "relative",
    };

    const textField = {
        width: 300,
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
        setChinese(json);
        setSpeaker(true);
    };

    const translateToJapanese = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const elm = document.getElementById("jpn");
        elm.innerText = "";
        const japaneseText = e.currentTarget.value;
        const urlWithParams = url + "?" + "text=" + japaneseText + "&source=zh-cn" + "&target=ja";
        const res = await fetch(urlWithParams);
        const json: string = await res.json();
        elm.innerText = json;
    };

    let pageContent = (
        <>
            <div style={{ marginBottom: 10 }}>
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
                <div>
                    <span>中国語</span>
                    <SyncAltIcon onTouchStart={() => doToggle(!pageToggle)} onMouseDown={() => doToggle(!pageToggle)} />
                    <span>日本語</span>
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
                    {speaker ? (
                        <div>
                            <SpeakerIcon
                                color="action"
                                style={{ fontSize: 30 }}
                                onTouchStart={() => speak(chinese)}
                                onMouseDown={() => speak(chinese)}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
