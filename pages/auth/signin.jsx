import React, { useState, useEffect, useContext } from "react";
import Amplify, { Auth } from "aws-amplify";

export default function signin() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleName(e) {
        setName(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function aws_signIN() {
        try {
            const user = await Auth.signIn(name, password);
            console.log("ok");
        } catch (error) {
            console.log("error signing in", error);
        }
    }

    return (
        <div>
            <input type="text" placeholder="username" onChange={handleName} />
            <input type="text" placeholder="password" onChange={handlePassword} />
            <button onClick={aws_signIN}>Sign In</button>
        </div>
    );
}
