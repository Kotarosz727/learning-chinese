type error_obj = {
    kind: string;
    msg: string;
};
export default class error_handler {
    res: error_obj;

    public handle_error = (e: any): error_obj => {
        if (e == "nonameException") {
            let res = { kind: "name", msg: "ユーザー名を入力してください" };
            return res;
        } else if (e == "noPasswordException") {
            let res = { kind: "password", msg: "パスワードを入力してください" };
            return res;
        } else if (e == "shortPasswordException") {
            let res = { kind: "password", msg: "パスワードは8文字以上を入力してください" };
            return res;
        } else if (e.name == "UsernameExistsException") {
            let res = { kind: "name", msg: "ユーザー名はすでに登録されています" };
            return res;
        } else if (e.message == "Password did not conform with policy: Password must have numeric characters") {
            let res = { kind: "password", msg: "パスワードには数字を含めてください" };
            return res;
        } else {
            throw e;
        }
    };
}
