import React, { useState } from "react";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";

export default function test() {
    const [style, setStyle] = useState({ textAlign: "center", marginTop: 20 });
    return (
        <AmplifyAuthenticator slot="confirm-sign-up">
            {/* <div style={style}>
                <AmplifySignOut button-text="Sign Out"></AmplifySignOut>
            </div> */}
        </AmplifyAuthenticator>
    );
}
