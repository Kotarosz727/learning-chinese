import React, { useState, useContext, useEffect } from "react";
import styles from "./card.module.css";
import SpeakerIcon from "@material-ui/icons/Speaker";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import BookmarkIcon from "@material-ui/icons/Bookmark";

export default function card({ sentence, index, userid, url }): JSX.Element {
    type type_favarites = {
        userid: string;
        chinese: string;
        pinin: string;
        japanese: string;
    }[];

    const [content, setContent] = useState(sentence);
    const [flip, setFlip] = useState(false);
    const speak = (value) => {
        responsiveVoice.speak(value, "Chinese Female");
    };
    const postFavorite = async () => {
        await new ChineseInterator().postFavorite(sentence, userid, url);
    };
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

    useEffect(() => {
        const fetchFavorite = async (url_favorite, userid) => {
            const res: type_favarites = await new ChineseInterator().fetchFavorites(url_favorite, userid);
            if (res?.length) {
                const bookmarked: string[] = [];
                res?.map((r) => {
                    bookmarked.push(r.chinese);
                });
                if (bookmarked.findIndex((item) => item === content.chinese) >= 0) {
                    content.bookmark = true;
                }
                const updated = { ...content };
                setContent(updated);
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
