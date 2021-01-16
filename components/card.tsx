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

    type data = {
        userid: string;
        chinese: string;
    };
    const [render, setRender] = useState(true);
    const url_favorite: string = process.env.LAMBDA_URL2;
    const postFavorite = async (value): Promise<void> => {
        await new ChineseInterator().postFavorite(value, userid, url);
        await updateBookmarkStatus(url_favorite, userid);
    };
    const deleteFavorite = async (value) => {
        const data: data = {
            userid: userid,
            chinese: value.chinese,
        };
        await new ChineseInterator().deleteFavorite(url_favorite, data);
        value.bookmark = false;
        setRender(!render);
    };

    let bookmark = <div></div>;
    if (sentence.bookmark === true) {
        bookmark = (
            <span className={styles.bookMark}>
                <BookmarkIcon fontSize="large" onClick={() => deleteFavorite(sentence)} />
            </span>
        );
    } else {
        bookmark = (
            <span className={styles.bookMark}>
                <BookmarkBorderOutlinedIcon fontSize="large" onClick={() => postFavorite(sentence)} />
            </span>
        );
    }
    const [flip, setFlip] = useState(false);
    const speak = (value) => {
        responsiveVoice.speak(value, "Chinese Female");
    };
    const updateBookmarkStatus = async (url_favorite, userid) => {
        const res: type_favarites = await new ChineseInterator().fetchFavorites(url_favorite, userid);
        if (res?.length) {
            const bookmarked: string[] = [];
            res?.map((r) => {
                bookmarked.push(r.chinese);
            });
            if (bookmarked.findIndex((item) => item === sentence.chinese) >= 0) {
                sentence.bookmark = true;
            }
            setRender(!render);
        }
    };

    const frontCard = (
        <div className={styles.front}>
            <h2>{sentence.japanese}</h2>
        </div>
    );
    const backCard = (
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
        if (userid) {
            updateBookmarkStatus(url_favorite, userid);
        }
    }, [userid]);

    return (
        <div className={`${styles.card} ${flip ? styles.flip : ""}`} key={index}>
            {flip ? backCard : frontCard}
            <span onMouseDown={() => setFlip(!flip)}>
                <CachedRoundedIcon className={styles.button} fontSize="large" />
            </span>
            <span id="bookmark">{userid ? bookmark : ""}</span>
        </div>
    );
}
