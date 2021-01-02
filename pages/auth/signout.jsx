import React, { useState } from "react";
import Amplify, { Auth } from "aws-amplify";

export default function signout() {
    Auth.currentAuthenticatedUser({
        bypassCache: false,
    })
        .then((user) => {
            console.log('ok', user);
        })
        .catch((err) => console.log('err', err));

    async function signOUT() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log("error signing out: ", error);
        }
    }

    return (
        <div>
            <button onClick={signOUT}>Sign Out</button>
        </div>
    );
}
