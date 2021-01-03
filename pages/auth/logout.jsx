import React, { useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import { Button } from "@material-ui/core";

export default function logout() {
    Auth.currentAuthenticatedUser({
        bypassCache: false,
    })
        .then((user) => {
            console.log("ok", user);
        })
        .catch((err) => console.log("err", err));

    async function logout() {
        try {
            await Auth.logout();
        } catch (error) {
            console.log("error signing out: ", error);
        }
    }

    return (
        <Button variant="contained" color="primary" onClick={logout}>
            ログアウト
        </Button>
    );
}
