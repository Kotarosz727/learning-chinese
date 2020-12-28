import React, { useState } from "react";
import styles from "./card.module.css";
import SpeakerIcon from "@material-ui/icons/Speaker";
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

export default function card({ sentence, index }) {
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
            <SpeakerIcon color="action" style={{ fontSize: 35 }} onTouchStart={() => speak(sentence.chinese)} onMouseDown={() => speak(sentence.chinese)} />
            <h2>{sentence.chinese}</h2>
            <p style={{ fontSize: 20 }}>{sentence.pinin}</p>
        </div>
    );
    return (
        <div className={`${styles.card} ${flip ? styles.flip : ""}`} key={index}>
            {flip ? back : front}
            <span className={styles.b_round} onMouseDown={() => setFlip(!flip)}><CachedRoundedIcon className={styles.button} fontSize="large"/></span>
        </div>
    );
}
