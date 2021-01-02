import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import { UserContext } from "../UserContext";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";

function MyApp({ Component, pageProps }) {
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    });

    return (
        <UserContext.Provider value={{ user: user, authState: authState, msg: "Hello Global State" }}>
            <AmplifyAuthenticator>
                <Component {...pageProps} />
            </AmplifyAuthenticator>
        </UserContext.Provider>
    );
}

export default MyApp;
