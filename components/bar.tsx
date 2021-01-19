import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MyMenu from "./menu";
import Link from "next/link";
import styles from "./bar.module.css";

export default function Bar({ username }) {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <div>
                        <MyMenu user={username} />
                    </div>
                    <Typography variant="h5">
                        <Link href="/">
                            <div className={styles.title}><a style={{ color: "white" }}>中国语学习</a></div>
                        </Link>
                    </Typography>
                    {username ? (
                        <Typography variant="h5">
                            <div className={styles.username}>你好! {username}</div>
                        </Typography>
                    ) : (
                        ""
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
