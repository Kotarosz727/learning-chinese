import React, { useState } from "react";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";

export default function signout() {
    const [style, setStyle] = useState({ textAlign: "center", marginTop: 20 });
    return (
        <AmplifyAuthenticator>
            <div style={style}>
                <AmplifySignOut button-text="Sign Out"></AmplifySignOut>
            </div>
        </AmplifyAuthenticator>
    );
}
