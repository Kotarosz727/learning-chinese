import React from "react";
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import { FormControl } from "@material-ui/core";
import { InputLabel } from '@material-ui/core';

export default function App() {

    return (
        <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
    );
}
