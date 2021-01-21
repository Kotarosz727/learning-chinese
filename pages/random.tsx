import React, { useState, useContext, useEffect } from "react";
import Pagination from "../components/pagination";
import styles from "../styles/Home.module.css";
import Head from "../components/head";
import { UserContext } from "../UserContext";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";

interface sentence {
    readonly chinese: string;
    readonly pinin: string;
    readonly japanese: string;
    bookmark: string | boolean;
}
export default function Random() {
    const userid: string = useContext(UserContext);
    const url: string = process.env.LAMBDA_URL_FRONT;
    const [items, setItems] = useState<Array<sentence> | []>([]);
    const [render, setRender] = useState(true);
    const url_favorite: string = process.env.LAMBDA_URL2;

    const updateBookmarkStatus = async (url_favorite, userid, items) => {
        const res: Array<sentence> = await new ChineseInterator().fetchFavorites(url_favorite, userid);
        if (res?.length) {
            const bookmarked: Array<string> = [];
            res?.map((r) => {
                bookmarked.push(r.chinese);
            });
            items.map((v) => {
                if (bookmarked.findIndex((item) => item === v.chinese) >= 0) {
                    v.bookmark = true;
                }
            });
            setItems(items);
            setRender(!render);
        }
    };

    const fetchRandomSentence = async (url) => {
        const sentence: Array<sentence> = await new ChineseInterator().fetchLists(url);
        const start = Math.floor(Math.random() * sentence?.length);
        const end = start + 10;
        const randomItems: Array<sentence> = sentence?.slice(start, end);
        setItems(randomItems);
        updateBookmarkStatus(url_favorite, userid, randomItems);
    };

    useEffect(() => {
        if (userid) {
            fetchRandomSentence(url);
        }
    }, []);

    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                <Pagination sentence={items} url={url} />
            </div>
        </>
    );
}
