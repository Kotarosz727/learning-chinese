import React, { useState, useEffect, useContext } from "react";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { UserContext } from "../../UserContext";

export default function signup() {
    const [style, setStyle] = useState({ textAlign: "center", marginTop: 20 });
    const { user, authState, msg } = useContext(UserContext);

    return authState === AuthState.SignedIn && user ? (
        <div>
            <div>
                Hello, {user.username}
                <AmplifySignOut />
            </div>
        </div>
    ) : (
        <div style={style}>
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
        </div>
    );
}
