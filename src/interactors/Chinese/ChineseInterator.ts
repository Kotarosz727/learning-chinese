export default class ChineseInterator {
    fetchLists = async (url): Promise<object | null> => {
        try {
            const res = await fetch(url);
            const sentences = await res.json();
            return sentences;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    postFavorite = async (data, userid, url): Promise<void> => {
        const mappeddata = {
            firstid: data.firstid,
            secondid: userid,
            chinese: data.chinese,
            japanese: data.japanese,
            pinin: data.pinin,
        };

        try {
            const res = await fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(mappeddata),
            });
        } catch (e) {
            console.log("got error", e);
        }
    };
}
