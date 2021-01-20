import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MyMenu from "./menu";
import Link from "next/link";

export default function Bar({ username }) {
    return (
        <div>
            <AppBar position="fixed" style={{background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);" }}>
                <Toolbar>
                    <div>
                        <MyMenu user={username} />
                    </div>
                    <Typography variant="h4" style={{ marginLeft: 30 }}>
                        <Link href="/">
                            <a style={{ color: "white" }}>中国语学习</a>
                        </Link>
                    </Typography>
                    {username ? (
                        <Typography variant="h6" style={{ marginLeft: 30 }}>
                            你好! {username}
                        </Typography>
                    ) : (
                        ""
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
