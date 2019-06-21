import { TokenType } from "./TokenType.enum";

export class Token {
    public type: TokenType;
    public value: string;

    constructor (type: TokenType, value: string) {
        this.type = type;
        this.value = value;
    }
}


