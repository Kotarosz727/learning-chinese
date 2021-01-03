import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import { UserContext } from "../UserContext";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import AppBar from "../components/bar"
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState();

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false,
        })
            .then((user) => {
                // console.log("user is authenticated", user);
                setUser(user.username)
            })
            .catch((err) => console.log("err", err));
    });

    return (
        <UserContext.Provider value={user}>
          <AppBar/>
            <Component {...pageProps} />
        </UserContext.Provider>
    );
}

export default MyApp;
