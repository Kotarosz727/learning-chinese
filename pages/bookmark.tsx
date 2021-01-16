import useSWR from "swr";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import Head from "../components/head";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import Pagination from "../components/pagination";
import styles from "../styles/Home.module.css";

export default function BookMark() {
    const userid = useContext(UserContext);
    const [favorites, setFavorites] = useState<[]>([]);
    const url_favorite = process.env.LAMBDA_URL2;

    useEffect(() => {
        const fetchFavorite = async (url_favorite, userid):Promise<void> => {
            setFavorites(await new ChineseInterator().fetchFavorites(url_favorite, userid));
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
