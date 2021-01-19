import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ViewContents from "./viewcontents";

interface sentence {
    readonly chinese: string;
    readonly pinin: string;
    readonly japanese: string;
    readonly bookmark: string | boolean;
}
interface Props {
    sentence: Array<sentence>;
    readonly url: string;
}
export default function Pagination({ sentence, url }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const startPage = currentPage * perPage;
    const endPage = startPage + perPage;

    const executeNextPage = (): void => {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
    };

    let NextButton: JSX.Element = <div></div>;
    if (Math.floor(sentence?.length / 10) >= 1) {
        NextButton = <NavigateNextIcon style={{ fontSize: 50 }} onClick={executeNextPage} />;
    }

    return (
        <>
            <ViewContents sentence={sentence} startPage={startPage} endPage={endPage} url={url} />
            <div className={styles.next}>{NextButton}</div>
        </>
    );
}
