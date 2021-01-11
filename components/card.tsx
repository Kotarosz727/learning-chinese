import React, { useState, useContext, useEffect } from "react";
import styles from "./card.module.css";
import SpeakerIcon from "@material-ui/icons/Speaker";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";
import { AuthState } from "@aws-amplify/ui-components";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { setupMaster } from "cluster";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";

export default function card({ sentence, index, userid , url}): JSX.Element {
    const speak = (s) => {
        responsiveVoice.speak(s, "Chinese Female");
    };

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
    const postFavorite = async () => {
        await new ChineseInterator().postFavorite(sentence, userid, url);
    };
    const bookMark = (
        <span className={styles.bookMark}>
            <BookmarkBorderOutlinedIcon fontSize="large" onClick={postFavorite} />
        </span>
    );

    return (
        <div className={`${styles.card} ${flip ? styles.flip : ""}`} key={index}>
            {flip ? back : front}
            <span onMouseDown={() => setFlip(!flip)}>
                <CachedRoundedIcon className={styles.button} fontSize="large" />
            </span>
            {userid ? bookMark : ""}
        </div>
    );
}
