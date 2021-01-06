import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Card from "../components/card";
import Head from "./head";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BlockIcon from "@material-ui/icons/Block";
import { UserContext } from "../UserContext";

export default function Home({ sentences }) {
    // const items = Array.from(sentences?.Items);
    // const start = Math.floor(Math.random() * items.length);
    // const end = start + 10;
    // const randomItems = items.slice(start, end);
    // const result = randomItems;
    let result = sentences?.Items;
    const [page, setPage] = useState(0);
    const loggedinUser = useContext(UserContext);
    let next = <NavigateNextIcon style={{ fontSize: 50 }} onClick={() => setPage(page + 1)} />;
    if (page == Math.floor(result.length / 10)) {
        next = <BlockIcon style={{ fontSize: 50 }} onClick={() => setPage(0)} />;
    }
    if (page == 0) {
        result = result.slice(0, 10);
    } else {
        const start = page * 10;
        const end = start + 10;
        result = result.slice(start, end);
        window.scrollTo(0, 0);
    }
    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                {result?.map((sentence, index) => (
                    <Card sentence={sentence} index={index} key={index} user={loggedinUser}></Card>
                ))}
            </div>
            <div className={styles.next}>{next}</div>
            <script src="https://code.responsivevoice.org/responsivevoice.js?key=vLiZJoXL"></script>
        </>
    );
}

export const getStaticProps = async (): Promise<object> => {
    const url = process.env.LAMBDA_URL;
    const res = await fetch(url);
    const sentences = await res.json();
    if (sentences.errors) {
        console.error(sentences.errors);
        throw new Error("Feild to Fetch data");
    }
    return {
        props: {
            sentences,
        },
    };
};
