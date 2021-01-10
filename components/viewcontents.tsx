import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Card from "../components/card";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { UserContext } from "../UserContext";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import BlockIcon from "@material-ui/icons/Block";

export default function component({ sentence, url, children }): JSX.Element {
    const userid = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const startPage = currentPage * perPage;
    const endPage = startPage + perPage;

    let viewContents = sentence?.slice(startPage, endPage);

    const executeNextPage = () => {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
    };

    let NextButton: JSX.Element = <NavigateNextIcon style={{ fontSize: 50 }} onClick={executeNextPage} />;
    if (currentPage == Math.floor(sentence?.length / 10)) {
        NextButton = <div>end</div>;
    }

    return (
        <>
            <div className={styles.container}>
                {viewContents?.map((value, index) => (
                    {children}
                ))}
            </div>
            <div className={styles.next}>{NextButton}</div>
        </>
    );
}

export const getStaticProps = async (): Promise<object> => {
    const url = process.env.LAMBDA_URL;
    const sentence = await new ChineseInterator().fetchLists(url);
    return {
        props: {
            sentence,
            url,
        },
    };
};