import { Auth } from "aws-amplify";
import error_handler from "../../Error/error_handler";
type error_obj = {
    kind: string;
    msg: string;
};
export default class aws_cognito {
    validated_name: string;
    validated_password: string;
    //add user to cognito user pool
    public cognito_signUp = async (input_name?: string, input_password?: string): Promise<true | error_obj> => {
        try {
            this.validated_name = this.validateName(input_name);
            this.validated_password = this.validatePassword(input_password);
            await Auth.signUp({
                username: this.validated_name,
                password: this.validated_password,
                attributes: {
                    name: this.validated_name,
                },
            });
            return true;
        } catch (error) {
            const res: error_obj = new error_handler().handle_error(error);
            return res;
        }
    };

    public cognito_login = async (input_name?: string, input_password?: string): Promise<true | error_obj> => {
        try {
            this.validated_name = this.validateName(input_name);
            this.validated_password = this.validatePassword(input_password);
            await Auth.signIn(this.validated_name, this.validated_password);
            return true;
        } catch (error) {
            const res: error_obj = new error_handler().handle_error(error);
            return res;
        }
    };

    public cognito_logout = async(): Promise<true | void> => {
        try {
            await Auth.signOut();
            return true;
        } catch(e) {
            console.log("log out error", e);
        }
    }

    private validateName = (name?: string): string => {
        if (!name) {
            throw "nonameException";
        }
        return name;
    };

    private validatePassword = (password?: string): string => {
        if (!password) {
            throw "noPasswordException";
        }
        if (password.length < 8) {
            throw "shortPasswordException";
        }
        return password;
    };
}
