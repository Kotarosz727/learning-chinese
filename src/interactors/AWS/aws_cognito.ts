import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";

export default class aws_cognito {
    validated_name: string;
    validated_password: string;

    //add user to cognito user pool
    public cognito_signUp = async (input_name?: string, input_password?: string): Promise<CognitoUser> => {
        this.validated_name = this.validateName(input_name);
        this.validated_password = this.validatePassword(input_password);
        const { user } = await Auth.signUp({
            username: this.validated_name,
            password: this.validated_password,
            attributes: {
                name: this.validated_name,
            },
        });
        return user;
    };

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
