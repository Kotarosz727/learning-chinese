import React, { useState, useEffect } from "react";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

export default function signup() {
    const [style, setStyle] = useState({ textAlign: "center", marginTop: 20 });
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    });

    return authState === AuthState.SignedIn && user ? (
        <div>
            <div>
                Hello, {user.username}
                <AmplifySignOut/>
            </div>
        </div>
    ) : (
        <div style={style}>
            <AmplifyAuthenticator>
                <AmplifySignUp
                    slot="sign-up"
                    headerText="Sign Up"
                    usernameAlias="email"
                    formFields={[
                        {
                            type: "email",
                            label: "Email address",
                            placeholder: "Enter your email address",
                            required: true,
                        },
                        {
                            type: "password",
                            label: "Password",
                            placeholder: "Enter your password",
                            required: true,
                        },
                    ]}
                ></AmplifySignUp>
            </AmplifyAuthenticator>
        </div>
    );
}
