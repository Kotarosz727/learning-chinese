import React, { useState, useContext, useEffect } from "react";
import Card from "../components/card";
import styles from "../styles/Home.module.css";
import Head from "../components/head";
import { UserContext } from "../UserContext";
import ChineseInterator from "../src/interactors/Chinese/ChineseInterator";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

interface sentence {
    readonly chinese: string;
    readonly pinin: string;
    readonly japanese: string;
    bookmark: string | boolean;
    type?: string;
}
export default function Random() {
    const userid: string = useContext(UserContext);
    const [notes, setNotes] = useState<Array<sentence>>([]);
    const [handle, sethandle] = useState(true);
    const url_note: string = process.env.LAMBDA_URL2;
    const url_note_post: string = process.env.LAMBDA_URL_FRONT;
    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchNote = async () => {
        const notes: Array<sentence> = await new ChineseInterator().fetchNotes(url_note, userid);
        setNotes(notes);
        sethandle(!handle);
    };

    const postNote = async () => {
        const myjapanese = (document.getElementById("myjapanese") as HTMLInputElement).value;
        const mychinese = (document.getElementById("mychinese") as HTMLInputElement).value;
        const mypinin = (document.getElementById("mypinin") as HTMLInputElement).value;
        const data = {
            myjapanese: myjapanese,
            mychinese: mychinese,
            mypinin: mypinin,
        };
        const res = await new ChineseInterator().postNote(data, userid, url_note_post);
        setOpen(false);
        fetchNote();
    };

    useEffect(() => {
        if (userid) {
            fetchNote();
        }
    }, []);

    const btn = (
        <div style={{ textAlign: "center", marginLeft: 300 }}>
            <Fab size="small" color="secondary" aria-label="add">
                <AddIcon onClick={handleClickOpen} />
            </Fab>
        </div>
    );

    return (
        <>
            <Head title="中国语学习"></Head>
            <div className={styles.container}>
                {notes?.map((value, index) => (
                    <Card sentence={value} index={index} userid={userid} url={url_note_post} fetchNote={fetchNote}/>
                ))}
                {notes.length ? btn : ""}
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">新規作成</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="mychinese" label="中国語" style={{ width: 250 }} />
                </DialogContent>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="myjapanese" label="日本語" style={{ width: 250 }} />
                </DialogContent>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="mypinin" label="pinin" style={{ width: 250 }} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={postNote} color="default" style={{ right: "1.2rem" }}>
                        追加
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
