import React, { useEffect, useState, useContext } from "react";
import Card from "../components/card";
import { UserContext } from "../UserContext";

interface sentence {
    readonly chinese: string;
    readonly pinin: string;
    readonly japanese: string;
    readonly bookmark: string | boolean;
}
interface Props {
    readonly startPage: number;
    readonly endPage: number;
    readonly sentence: Array<sentence>;
    readonly url: string;
}
export default function ViewContents({ startPage, endPage, sentence, url }:Props): JSX.Element {
    const userid:string = useContext(UserContext);

    let viewContents = sentence?.slice(startPage, endPage);

    return (
        <>
            {viewContents?.map((value, index) => (
                <Card sentence={value} index={index} key={index} userid={userid} url={url}></Card>
            ))}
        </>
    );
}
