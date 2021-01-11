import { AppBar } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import Head from "../components/head";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";

const BookMark =({url}) => {
    useEffect(() => {
        const userid = useContext(UserContext);

        const favorites = async() => {
            await new ChineseInterator().fetchFavorites(url, userid)
        }
        
    });
    return <Head title={"ブックマーク"}></Head>;
}

export const getStaticProps = async (): Promise<object> => {
    const url = process.env.LAMBDA_URL2;
    return {
        props: {
            url
        },
    };
};
