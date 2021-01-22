import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Head from "../components/head";
import { UserContext } from "../UserContext";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import Pagination from "../components/pagination";

interface sentence {
    readonly chinese: string;
    readonly pinin: string;
    readonly japanese: string;
    bookmark: string | boolean;
    type?: string;
}
interface Props {
    sentence: Array<sentence>;
    readonly url_main: string;
}
export default function component({ sentence, url_main }: Props) {
    const userid: string = useContext(UserContext);

    const [render, setRender] = useState(true);
    const url_favorite: string = process.env.LAMBDA_URL2;
    const updateBookmarkStatus = async (url_favorite, userid) => {
        const res: Array<sentence> = await new ChineseInterator().fetchFavorites(url_favorite, userid);
        if (res?.length) {
            const bookmarked: Array<string> = [];
            res?.map((r) => {
                bookmarked.push(r.chinese);
            });
            sentence.map((v) => {
                if (bookmarked.findIndex((item) => item === v.chinese) >= 0) {
                    v.bookmark = true;
                }
            });
            setRender(!render);
        }
    };

    useEffect(() => {
        if (userid) {
            updateBookmarkStatus(url_favorite, userid);
        }
    }, [userid]);

    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                <Pagination sentence={sentence} url={url_main} />
            </div>
        </>
    );
}

export const getStaticProps = async (): Promise<object> => {
    const url_main:string = process.env.LAMBDA_URL;
    const sentence:[] = (await new ChineseInterator().fetchLists(url_main)) ?? [];
    return {
        props: {
            sentence,
            url_main,
        },
    };
};
