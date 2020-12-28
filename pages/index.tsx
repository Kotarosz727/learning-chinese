import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";
import Card from "../components/card";
import Head from "./head";

export default function Home({ json }) {
    return (
        <>
            <Head></Head>
            <div className={styles.container}>
                {json?.Items.map((sentence, index) => (
                    <Card sentence={sentence} index={index}></Card>
                ))}
                <script src="https://code.responsivevoice.org/responsivevoice.js?key=vLiZJoXL"></script>
            </div>
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
