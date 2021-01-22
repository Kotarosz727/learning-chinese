import React, { useState, useContext, useEffect } from "react";
import Pagination from "../components/pagination";
import styles from "../styles/Home.module.css";
import Head from "../components/head";
import { UserContext } from "../UserContext";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";

interface notes {
    readonly chinese: string;
    readonly pinin: string;
    readonly japanese: string;
    bookmark: string | boolean;
    type?: string;
}
export default function Random() {
    const userid: string = useContext(UserContext);
    const [notes, setNotes] = useState<Array<notes> | []>([]);
    const [render, setRender] = useState(true);
    const url_notes: string = process.env.LAMBDA_URL2;

    const fetchNote = async () => {
        const notes: Array<notes> = await new ChineseInterator().fetchNotes(url_notes, userid);
        setNotes(notes);
    };

    useEffect(() => {
        if (userid) {
            fetchNote();
        }
    }, []);

    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                <Pagination sentence={notes} url={""} />
            </div>
        </>
    );
}
