import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MyMenu from "./menu";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(3),
        },
        title: {
            marginLeft: 10,
            flexGrow: 1,
        },
    })
);

export default function Bar({ user }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <div className={classes.menuButton}>
                        <MyMenu user={user} />
                    </div>

                    <Typography variant="h4" className={classes.title}>
                        <Link href="/">
                            <a style={{ color: "white" }}>中国语学习</a>
                        </Link>
                    </Typography>
                    {user ? (
                        <Typography variant="h6" className={classes.title}>
                            你好! {user}
                        </Typography>
                    ) : (
                        ""
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
