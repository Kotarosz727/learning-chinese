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
    type?: string;
}
interface Props {
    randomItems: Array<sentence>
}
export default function Random({randomItems}:Props) {
    const userid: string = useContext(UserContext);
    const url: string = process.env.LAMBDA_URL_FRONT;
    const [items, setItems] = useState<Array<sentence> | []>([]);
    const [render, setRender] = useState(true);
    const url_favorite: string = process.env.LAMBDA_URL2;

    const updateBookmarkStatus = async (url_favorite, userid, items:Array<sentence>) => {
        const res: Array<sentence> = await new ChineseInterator().fetchFavorites(url_favorite, userid);
        console.log("aa",items)
        if (res?.length) {
            const bookmarked: Array<string> = [];
            res?.map((r) => {
                bookmarked.push(r.chinese);
            });
            items?.map((v) => {
                if (bookmarked.findIndex((item) => item === v.chinese) >= 0) {
                    v.bookmark = true;
                }
            });
            setItems(items);
            setRender(!render);
        }
    };

    useEffect(() => {
        if (userid) {
            updateBookmarkStatus(url_favorite, userid, randomItems);
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

export const getServerSideProps = async (): Promise<object> => {
    const url_main: string = process.env.LAMBDA_URL;
    const sentence: [] = (await new ChineseInterator().fetchLists(url_main)) ?? [];
    const start = Math.floor(Math.random() * sentence?.length);
    const end = start + 10;
    const randomItems: Array<sentence> = sentence?.slice(start, end);
    return {
        props: {
            randomItems,
            url_main,
        },
    };
};
