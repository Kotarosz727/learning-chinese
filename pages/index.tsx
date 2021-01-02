import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Card from "../components/card";
import Head from "./head";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Bar from "../components/bar";
import BlockIcon from "@material-ui/icons/Block";
import { UserContext } from "../UserContext";

export default function Home({ json }) {
    // const items = Array.from(json?.Items);
    // const start = Math.floor(Math.random() * items.length);
    // const end = start + 10;
    // const randomItems = items.slice(start, end);
    // const result = randomItems;
    let result = json?.Items;
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
            <Head></Head>
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

export async function getStaticProps() {
    const url = "https://mlsei45cm3.execute-api.ap-northeast-1.amazonaws.com/dev/sentences";
    const res = await fetch(url);
    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error("Feild to Fetch data");
    }
    return {
        props: {
            json,
        },
    };
}
