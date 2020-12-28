import React, { useState } from "react";
import styles from "./card.module.css";
import SpeakerIcon from "@material-ui/icons/Speaker";

export default function card({ sentence, index }) {
    const speak = (s) => {
        responsiveVoice.speak(s, "Chinese Female");
    };
    const [flip, setFlip] = useState(false);
    const front = <div className={styles.front}><h2>{sentence.japanese}</h2></div>;
    const back = (
        <div className={styles.back}>
            <SpeakerIcon color="action" style={{ fontSize: 35 }} onMouseEnter={() => speak(sentence.chinese)} />
            <h2>{sentence.chinese}</h2> 
            <p style={{fontSize: 14}}>{sentence.pinin}</p>
        </div>
    );

    return (
        <div className={`${styles.card} ${flip ? styles.flip : ''}`} onMouseDown={() => setFlip(!flip)} onTouchStart={() => setFlip(!flip)}>
            {flip ? back : front}
            {/* {front}
            {back} */}
        </div>
    );
}
