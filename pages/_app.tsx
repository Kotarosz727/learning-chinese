import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import { UserContext } from "../UserContext";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import AppBar from "../components/bar";
Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }) {
    // if (typeof window !== "undefined") {
    //     const isLocalhost = Boolean(
    //         window.location.hostname === "localhost" ||
    //             // [::1] is the IPv6 localhost address.
    //             window.location.hostname === "[::1]" ||
    //             // 127.0.0.1/8 is considered localhost for IPv4.
    //             window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    //     );
    //     // Assuming you have two redirect URIs, and the first is for localhost and second is for production
    //     const [localRedirectSignIn, productionRedirectSignIn] = awsconfig.oauth.redirectSignIn.split(",");
    //     console.log("aaaaa", productionRedirectSignIn);
    //     const [localRedirectSignOut, productionRedirectSignOut] = awsconfig.oauth.redirectSignOut.split(",");

    //     const updatedAwsConfig = {
    //         ...awsconfig,
    //         oauth: {
    //             ...awsconfig.oauth,
    //             redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    //             redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    //         },
    //     };
    //     Amplify.configure(updatedAwsConfig);
    // }

    const [username, setUsername] = useState(null);
    const [userid, setUserid] = useState(null);
    const [pictureUrl, setPictureUrl] = useState(null);
    // const [signedInUser, setSignedInUser] = useState(false);

    useEffect(() => {
        // Hub.listen("auth", ({ payload: { event, data } }) => {
        //     console.log('event',event)
        //     console.log('data',data)
        //     switch (event) {
        //         case "signIn":
        //             this.setUser(data);
        //             break;
        //         case "signOut":
        //             this.setUser(null);
        //             break;
        //         //   case "customOAuthUser":
        //         //     this.setUser({ customState: data });
        //     }
        // });
        // console.log("user!!!", user)
        Auth.currentAuthenticatedUser()
            .then((user) => {
                if (user.attributes?.picture) {
                    const data = JSON.stringify(user.attributes.picture);
                    const url = data.split("\\")[9];
                    setPictureUrl(url);
                }
                setUsername(user.attributes.name);
                setUserid(user.attributes.sub);
            })
            .catch((err) => console.log("error", err));
    });

    return (
        <UserContext.Provider value={userid}>
            <AppBar username={username} picture_url={pictureUrl} />
            <Component {...pageProps} />
            <script src="https://code.responsivevoice.org/responsivevoice.js?key=vLiZJoXL"></script>
        </UserContext.Provider>
    );
}

export default MyApp;
