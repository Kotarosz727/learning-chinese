import useSWR from "swr";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import Head from "../components/head";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import Pagination from "../components/pagination";
import styles from "../styles/Home.module.css";

export default function BookMark({ url }) {
    const userid = useContext(UserContext);
    const [favorites, setFavorites] = useState<[]>([]);

    useEffect(() => {
        const fetchFavorite = async (url, userid):Promise<void> => {
            setFavorites(await new ChineseInterator().fetchFavorites(url, userid));
        };
        fetchFavorite(url, userid);
    }, userid);

    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                <Pagination sentence={favorites} url={url} />
            </div>
        </>
    );
}

export const getStaticProps = async () => {
    const url = process.env.LAMBDA_URL2;
    return {
        props: {
            url,
        },
    };
};
