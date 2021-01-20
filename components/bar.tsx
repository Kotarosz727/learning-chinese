import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MyMenu from "./menu";
import Link from "next/link";
import styles from "./bar.module.css";
import Avatar from "@material-ui/core/Avatar";

export default function Bar({ username, picture_url }) {
    let avater = <div></div>;

    if (picture_url) {
        const trimed_url = picture_url?.slice(1);
        avater = <Avatar alt="alt" src={trimed_url} style={{ marginLeft: 15 }} />;
    }
    return (
        <div>
            <AppBar position="fixed" style={{ background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);" }}>
                <Toolbar>
                    <div>
                        <MyMenu user={username} />
                    </div>
                    <Typography variant="h5">
                        <Link href="/">
                            <div className={styles.title}>
                                <a style={{ color: "white" }}>中国语学习</a>
                            </div>
                        </Link>
                    </Typography>
                    {username ? (
                        <>
                            <Typography variant="h5">
                                <div>
                                    <span className={styles.username}>你好! {username}</span>
                                </div>
                            </Typography>
                            <Typography>
                                <span>{avater}</span>
                            </Typography>
                        </>
                    ) : (
                        ""
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
