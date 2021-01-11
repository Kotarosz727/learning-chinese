import React, { useEffect, useState, useContext } from "react";
import Card from "../components/card";
import { UserContext } from "../UserContext";

export default function ViewContents({ startPage, endPage, sentence, url }): JSX.Element {
    const userid = useContext(UserContext);

    let viewContents = sentence?.slice(startPage, endPage);

    return (
        <>
            {viewContents?.map((value, index) => (
                <Card sentence={value} index={index} key={index} userid={userid} url={url}></Card>
            ))}
        </>
    );
}
