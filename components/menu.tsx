import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";
import { useRouter } from "next/router";
import aws_cognito from "../src/interactors/AWS/aws_cognito";

export default function MyMenu({ user }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        const res = await new aws_cognito().cognito_logout();
        if (res === true) {
            alert("ログアウトしました");
            router.push("/");
        }
    };

    return (
        <div>
            <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </div>
            {user ? (
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem>
                        <Link href="/bookmark">
                            <a style={{ color: "white" }}>ブックマーク</a>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/random">
                            <a style={{ color: "white" }}>ランダム10選</a>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/translate">
                            <a style={{ color: "white" }}>翻訳</a>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/notes">
                            <a style={{ color: "white" }}>単語帳</a>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={() => logout()}>ログアウト</MenuItem>
                </Menu>
            ) : (
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem>
                        <Link href="/auth/login">
                            <a>Sign In</a>
                        </Link>
                    </MenuItem>
                </Menu>
            )}
        </div>
    );
}
