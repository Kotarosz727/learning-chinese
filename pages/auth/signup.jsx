import React, { useState, useEffect, useContext } from "react";
import Amplify, { Auth } from "aws-amplify";

export default function signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const formStyle = {
        display: 'block',
        alignItems: 'center',
        margin: '0 auto',
        position: 'relative',
        border: '2px solid #ccc',
        borderRadius: '0.25rem',
        width: '350px',
        height: '200px',
    };

    function handleName(e) {
        setName(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function aws_signUP() {
        try {
            const { user } = await Auth.signUp({
                password: password,
                username: name,
                attributes: {
                    name: name,
                },
            });
            console.log("ok:", user);
        } catch (error) {
            console.log("error signing up:", error);
        }
    }

    return (
        <div style={formStyle}>
            <span>Sign up</span>
            <input type="text" placeholder="username" onChange={handleName} />
            <input type="text" placeholder="password" onChange={handlePassword} />
            <button onClick={aws_signUP}>Sign Up</button>
        </div>
    );
}
