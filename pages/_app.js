import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import { UserContext } from "../UserContext";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import AppBar from "../components/bar";
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false,
        }).then((user) => {
            setUser(user.username);
        });
        // .catch((err) => console.log("err", err));
    });

    return (
        <UserContext.Provider value={user}>
            <AppBar user={user} />
            <Component {...pageProps} />
        </UserContext.Provider>
    );
}

export default MyApp;
