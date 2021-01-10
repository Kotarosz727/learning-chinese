export default class ChineseInterator {
    public fetchLists = async (url): Promise<object | null> => {
        try {
            const res = await fetch(url);
            const sentences = await res.json();
            return sentences.Items;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    public postFavorite = async (data, userid, url): Promise<void> => {
        const mappeddata = {
            userid: userid,
            chinese: data.chinese,
            japanese: data.japanese,
            pinin: data.pinin,
        };
        console.log(mappeddata);
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

    public fetchFavorites = async (url, userid): Promise<any> => {
        try {
            const res = await fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(userid),
            });
            return res;
        } catch (e) {
            console.log("got error", e);
        }
    };
}
