import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Amplify, { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MyMenu({ user }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function logout() {
        try {
            await Auth.signOut();
            router.push("/");
        } catch (error) {
            console.log("error signing out: ", error);
        }
    }

    return (
        <div>
            <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </div>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                {user ? (
                    <MenuItem onClick={() => logout()}>ログアウト</MenuItem>
                ) : (
                    <>
                        <MenuItem>
                            <Link href="/auth/login">
                                <a>ログイン</a>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/auth/signup">
                                <a>会員登録</a>
                            </Link>
                        </MenuItem>
                    </>
                )}
            </Menu>
        </div>
    );
}
