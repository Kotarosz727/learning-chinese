import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import { UserContext } from "../UserContext";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import AppBar from "../components/bar";
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
    const [username, setUsername] = useState(null);
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false,
        }).then((user) => {
            setUsername(user.username);
            setUserid(user.attributes.sub);
        });
    });

    return (
        <UserContext.Provider value={userid}>
            <AppBar username={username} />
            <Component {...pageProps} />
            <script src="https://code.responsivevoice.org/responsivevoice.js?key=vLiZJoXL"></script>
        </UserContext.Provider>
    );
}

export default MyApp;
