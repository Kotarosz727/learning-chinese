import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Card from "../components/card";
import Head from "../components/head";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { UserContext } from "../UserContext";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import BlockIcon from "@material-ui/icons/Block";
import Pagination from "../components/pagination";

export default function component({ sentence, url_main, url_favorite }) {
    type type_favarites = {
        userid: string;
        chinese: string;
        pinin: string;
        japanese: string;
    }[];
    const userid = useContext(UserContext);
    // const [favorites, setFavorites] = useState<type_favarites | []>([]);

    let s = sentence;

    useEffect(() => {
        const fetchFavorite = async (url_favorite, userid) => {
            const res: type_favarites = await new ChineseInterator().fetchFavorites(url_favorite, userid);
            if (res.length) {
                const bookmark_array = [];
                res?.map((r) => {
                    bookmark_array.push(r.chinese);
                });
                console.log("aaaaaa", bookmark_array);
                s.map((v) => {
                    if (bookmark_array.findIndex((item) => item === v.chinese) >= 0) {
                        v.bookmark = true
                    }
                });
            }
        };
        if (userid) {
            fetchFavorite(url_favorite, userid);
        }
    }, userid);

    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                <Pagination sentence={s} url={url_main} />
            </div>
        </>
    );
}

export const getStaticProps = async (): Promise<object> => {
    const url_main = process.env.LAMBDA_URL;
    const url_favorite = process.env.LAMBDA_URL2;

    const sentence = (await new ChineseInterator().fetchLists(url_main)) ?? [];
    return {
        props: {
            sentence,
            url_main,
            url_favorite,
        },
    };
};
