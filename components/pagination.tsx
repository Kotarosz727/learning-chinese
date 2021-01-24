import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
    const executeBackPage = (): void => {
        setCurrentPage(currentPage - 1);
        window.scrollTo(0, 0);
    };

    let NextButton: JSX.Element = <div></div>;
    //not first page && not last page
    if (Math.ceil(sentence?.length / 10) > 1 && Math.floor(sentence?.length / 10) != currentPage) {
        let style: React.CSSProperties = { fontSize: 40, textAlign: "center" };
        //button position should be center if it is first page
        currentPage >= 1 ? (style = { fontSize: 40, marginLeft: 50 }) : (style = style);
        NextButton = <ArrowForwardIcon style={style} onClick={executeNextPage} />;
    }
    let backButton: JSX.Element = <div></div>;
    if (currentPage >= 1) {
        let style: React.CSSProperties = { fontSize: 40, textAlign: "center" };
        //button position should be center if it is last page
        currentPage === Math.floor(sentence?.length / 10)
            ? (style = style)
            : (style = { fontSize: 40, marginRight: 50 });
        backButton = <ArrowBackIcon style={style} onClick={executeBackPage} />;
    }

    return (
        <>
            <ViewContents sentence={sentence} startPage={startPage} endPage={endPage} url={url} />
            <div className={styles.arrow}>
                {backButton}
                {NextButton}
            </div>
        </>
    );
}
