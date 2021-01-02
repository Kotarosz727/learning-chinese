import React, { useState, useContext, useEffect } from "react";
import styles from "./card.module.css";
import SpeakerIcon from "@material-ui/icons/Speaker";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";
import { AuthState } from "@aws-amplify/ui-components";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { setupMaster } from "cluster";

export default function card({ sentence, index, user, authState }): JSX.Element {
    const speak = (s) => {
        responsiveVoice.speak(s, "Chinese Female");
    };
    const [myuser, setUser] = useState();
    const [myAuthState, setMyauthState] = useState();
    useEffect(() => {
        setUser(user);
        setMyauthState(authState);
    });
    console.log("authState", authState);
    const [flip, setFlip] = useState(false);
    const front = (
        <div className={styles.front}>
            <h2>{sentence.japanese}</h2>
        </div>
    );
    const back = (
        <div className={styles.back}>
            <SpeakerIcon
                color="action"
                style={{ fontSize: 35 }}
                onTouchStart={() => speak(sentence.chinese)}
                onMouseDown={() => speak(sentence.chinese)}
            />
            <h2>{sentence.chinese}</h2>
            <p style={{ fontSize: 20 }}>{sentence.pinin}</p>
        </div>
    );
    const bookMark = (
        <span className={styles.bookMark}>
            <BookmarkBorderOutlinedIcon fontSize="large" />
        </span>
    );

    return (
        <div className={`${styles.card} ${flip ? styles.flip : ""}`} key={index}>
            {flip ? back : front}
            <span onMouseDown={() => setFlip(!flip)}>
                <CachedRoundedIcon className={styles.button} fontSize="large" />
                {myAuthState === AuthState?.SignedIn && myuser ? bookMark : ""}
            </span>
        </div>
    );
}
