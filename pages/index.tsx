import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Card from "../components/card";
import Head from "../components/head";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { UserContext } from "../UserContext";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import BlockIcon from "@material-ui/icons/Block";
import Pagination from "../components/pagination";

export default function component({ sentence, url_main}) {

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
    const url_main = process.env.LAMBDA_URL;

    const sentence = (await new ChineseInterator().fetchLists(url_main)) ?? [];
    return {
        props: {
            sentence,
            url_main,
        },
    };
};
