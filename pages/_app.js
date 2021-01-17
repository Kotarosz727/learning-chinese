import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import { UserContext } from "../UserContext";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import AppBar from "../components/bar";
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
    if (process.browser) {
        const isLocalhost = Boolean(
            window.location.hostname === "localhost" ||
                // [::1] is the IPv6 localhost address.
                window.location.hostname === "[::1]" ||
                // 127.0.0.1/8 is considered localhost for IPv4.
                window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
        );
        // Assuming you have two redirect URIs, and the first is for localhost and second is for production
        const [localRedirectSignIn, productionRedirectSignIn] = awsconfig.oauth.redirectSignIn.split(",");
        console.log("aaaaa", productionRedirectSignIn);
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
    const [signedInUser, setSignedInUser] = useState(false);

    useEffect(() => {
        authListener();
        // Auth.currentAuthenticatedUser({
        //     bypassCache: false,
        // })
        //     .then((user) => {
        //         console.log("aaaaa", user);
        //         setUsername(user.attributes.name);
        //         setUserid(user.attributes.sub);
        //     })
        //     .then((data) => console.log("data", data))
        //     .catch((err) => console.log("error", err));
    });

    async function authListener() {
        Hub.listen("auth", (data) => {
            switch (data.payload.event) {
                case "signIn":
                    return setSignedInUser(true);
                case "signOut":
                    return setSignedInUser(false);
            }
        });
        try {
            const user = await Auth.currentAuthenticatedUser();
            setSignedInUser(true);
            console.log("aaaaa", user);
            if(signedInUser) {
                setUsername(user.attributes.name);
                setUserid(user.attributes.sub);
            }
            
        } catch (err) {
            console.log("error", err);
        }
    }

    return (
        <UserContext.Provider value={userid}>
            <AppBar username={username} />
            <Component {...pageProps} />
            <script src="https://code.responsivevoice.org/responsivevoice.js?key=vLiZJoXL"></script>
        </UserContext.Provider>
    );
}

export default MyApp;
