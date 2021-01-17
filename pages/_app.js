import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import { UserContext } from "../UserContext";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import AppBar from "../components/bar";
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
    if (process.browser) {
        const isLocalhost = Boolean(window.location.hostname === "localhost");
        // Assuming you have two redirect URIs, and the first is for localhost and second is for production
        const [localRedirectSignIn, productionRedirectSignIn] = awsconfig.oauth.redirectSignIn.split(",");

        const [localRedirectSignOut, productionRedirectSignOut] = awsconfig.oauth.redirectSignOut.split(",");

        const updatedAwsConfig = {
            ...awsconfig,
            oauth: {
                ...awsconfig.oauth,
                redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
                redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
            },
        };
        Amplify.configure(updatedAwsConfig);
    }

    const [username, setUsername] = useState(null);
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false,
        }).then((user) => {
            console.log("aaaaa", user);
            setUsername(user.attributes.name);
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
