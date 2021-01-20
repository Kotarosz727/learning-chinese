import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import Head from "../components/head";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import Pagination from "../components/pagination";
import styles from "../styles/Home.module.css";

interface sentence {
    readonly chinese: string;
    readonly pinin: string;
    readonly japanese: string;
    bookmark: string | boolean;
}
export default function BookMark() {
    const userid: string = useContext(UserContext);
    const [favorites, setFavorites] = useState<Array<sentence> | null>();
    const url_favorite: string = process.env.LAMBDA_URL2;
    useEffect(() => {
        const fetchFavorite = async (url_favorite: string, userid: string): Promise<void> => {
            const res: Array<sentence> = await new ChineseInterator().fetchFavorites(url_favorite, userid);
            if (res?.length) {
                res.map((v) => {
                    v.bookmark = true;
                });
            }
            setFavorites(res);
        };
        fetchFavorite(url_favorite, userid);
    }, [userid]);
    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                <Pagination sentence={favorites} url={""} />
            </div>
        </>
    );
}
