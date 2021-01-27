import React, { useState, useContext, useEffect } from "react";
import styles from "./card.module.css";
import SpeakerIcon from "@material-ui/icons/Speaker";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useRouter } from "next/router";

interface sentence {
    readonly chinese: string;
    readonly pinin: string;
    readonly japanese: string;
    bookmark: string | boolean;
    type?: string;
}
interface Props {
    sentence: sentence;
    readonly index: number;
    readonly userid: string;
    readonly url: string;
    fetchNote?: () => Promise<void>;
}
export default function card({ sentence, index, userid, url, fetchNote }: Props): JSX.Element {
    type type_favarites = {
        userid: string;
        chinese: string;
        pinin: string;
        japanese: string;
        type: string;
    }[];
    type data = {
        userid: string;
        chinese: string;
    };

    const router = useRouter();
    const [render, setRender] = useState<boolean>(true);
    const url_favorite: string = process.env.LAMBDA_URL2;
    const postFavorite = async (value): Promise<void> => {
        await new ChineseInterator().postFavorite(value, userid, url);
        await updateBookmarkStatus(url_favorite, userid);
    };
    const deleteFavorite = async (value): Promise<void> => {
        const data: data = {
            userid: userid,
            chinese: value.chinese,
        };
        await new ChineseInterator().deleteFavorite(url_favorite, data);
        value.bookmark = false;
        setRender(!render);
    };
    const deleteNote = async (value): Promise<void> => {
        const data: data = {
            userid: userid,
            chinese: value.chinese,
        };
        await new ChineseInterator().deleteNote(url_favorite, data);
        fetchNote();
    };

    let bookmark: JSX.Element = <div></div>;
    if (sentence.bookmark === true) {
        bookmark = (
            <span className={styles.leftPosition}>
                <BookmarkIcon fontSize="large" onClick={() => deleteFavorite(sentence)} />
            </span>
        );
    } else if (sentence.type != "note") {
        bookmark = (
            <span className={styles.leftPosition}>
                <BookmarkBorderOutlinedIcon fontSize="large" onClick={() => postFavorite(sentence)} />
            </span>
        );
    }
    const [flip, setFlip] = useState<boolean>(false);
    const speak = (value): void => {
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

    const noteDeleteButton = (
        <div className={styles.leftPosition}>
            <DeleteForeverIcon fontSize="large" onClick={() => deleteNote(sentence)} />
        </div>
    );

    const frontCard: JSX.Element = (
        <div className={styles.front}>
            <h2>{sentence.japanese}</h2>
        </div>
    );
    const backCard: JSX.Element = (
        <>
            <div className={styles.back}>
                <SpeakerIcon
                    color="action"
                    style={{ fontSize: 35 }}
                    onClick={()=>responsiveVoice.speak(sentence.chinese)}
                />
                <h2>{sentence.chinese}</h2>
                <p style={{ fontSize: 15 }}>{sentence.pinin}</p>
            </div>
            {sentence.type === "note" ? noteDeleteButton : ""}
        </>
    );

    useEffect(() => {
        setFlip(false);
    }, [sentence]);

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
