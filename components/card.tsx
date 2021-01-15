import React, { useState, useContext, useEffect } from "react";
import styles from "./card.module.css";
import SpeakerIcon from "@material-ui/icons/Speaker";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";
import { AuthState } from "@aws-amplify/ui-components";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { setupMaster } from "cluster";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookMark from "../pages/bookmark";

export default function card({ sentence, index, userid, url }): JSX.Element {
    type type_favarites = {
        userid: string;
        chinese: string;
        pinin: string;
        japanese: string;
    }[];

    const [s, sets] = useState(sentence);

    const speak = (s) => {
        responsiveVoice.speak(s, "Chinese Female");
    };
    const postFavorite = async () => {
        await new ChineseInterator().postFavorite(sentence, userid, url);
    };

    useEffect(() => {
        const fetchFavorite = async (url_favorite, userid) => {
            const res: type_favarites = await new ChineseInterator().fetchFavorites(url_favorite, userid);
            if (res?.length) {
                const bookmark_array = [];
                res?.map((r) => {
                    bookmark_array.push(r.chinese);
                });
                if (bookmark_array.findIndex((item) => item === s.chinese) >= 0){
                    s.bookmark = true
                }
                const updated = {...s}
                sets(updated)  
            }
        };
        if (userid) {
            const url_favorite = process.env.LAMBDA_URL2;
            fetchFavorite(url_favorite, userid);
        }
    }, [userid]);

    let bookmark = <div></div>;
    if (sentence.bookmark === true) {
        bookmark = (
            <span className={styles.bookMark}>
                <BookmarkIcon fontSize="large" />
            </span>
        );
    } else {
        bookmark = (
            <span className={styles.bookMark}>
                <BookmarkBorderOutlinedIcon fontSize="large" onClick={postFavorite} />
            </span>
        );
    }

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

    return (
        <div className={`${styles.card} ${flip ? styles.flip : ""}`} key={index}>
            {flip ? back : front}
            <span onMouseDown={() => setFlip(!flip)}>
                <CachedRoundedIcon className={styles.button} fontSize="large" />
            </span>
            {userid ? bookmark : ""}
        </div>
    );
}
