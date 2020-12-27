import styles from "../styles/Home.module.css";
import Head from "./head";

export default function Home({ json }) {
    return (
        <>
            <Head></Head>
            <div>
                {json?.Items.map((sentence, index) => (
                    <>
                        <div>{sentence.chinese}</div>
                        <div>{sentence.japanese}</div>
                        <div>{sentence.pinin}</div>
                        <br></br>
                    </>
                ))}
                <script src="https://code.responsivevoice.org/responsivevoice.js?key=vLiZJoXL"></script>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const url: string = "https://mlsei45cm3.execute-api.ap-northeast-1.amazonaws.com/dev/sentences";
    const res = await fetch(url);
    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error("Feild to Fetch data");
    }

    return {
        props: {
            json,
        },
    };
}
