import BookMark from "../../../pages/bookmark";
export default class ChineseInterator {
    public fetchLists = async (url): Promise<[] | null> => {
        try {
            const res = await fetch(url, { method: "GET" });
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
            type: "favorite",
        };
        // console.log(mappeddata);
        try {
            const res = await fetch(url, {
                method: "POST",
                // mode: "no-cors",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(mappeddata),
            });
        } catch (e) {
            console.log("got error", e);
        }
    };

    public postNote = async (data, userid, url) => {
        const mappeddata = {
            userid: userid,
            chinese: data.mychinese,
            japanese: data.myjapanese,
            pinin: data.mypinin,
            type: "note",
        };
        try {
            const res = await fetch(url, {
                method: "POST",
                // mode: "no-cors",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(mappeddata),
            });
            console.log(res);

            return await res.json();
        } catch (e) {
            console.log("got error", e);
        }
    };

    public fetchFavorites = async (url, userid): Promise<[] | null> => {
        if (userid && url) {
            const data = {
                userid: userid,
            };

            const res = await fetch(url, {
                method: "POST",
                // mode: "no-cors",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            const sentences = json.Items;
            const ret_arr = sentences.reduce((accumulater, currentValue) => {
                if (currentValue.type != "note") {
                    accumulater.push(currentValue);
                }
                return accumulater;
            }, []);
            return ret_arr;
        }
    };

    public fetchNotes = async (url, userid): Promise<[] | null> => {
        if (userid && url) {
            const data = {
                userid: userid,
            };

            const res = await fetch(url, {
                method: "POST",
                // mode: "no-cors",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            const sentences = json.Items;
            const ret_arr = sentences.reduce((accumulater, currentValue) => {
                if (currentValue.type === "note") {
                    accumulater.push(currentValue);
                }
                return accumulater;
            }, []);
            return ret_arr;
        }
    };

    public deleteFavorite = async (url: string, data: { userid: string; chinese: string }) => {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("deleted");
    };

    public deleteNote = async (url: string, data: { userid: string; chinese: string }) => {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("deleted");
    };
}
