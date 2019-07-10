import { TokenType } from "./TokenType.enum";
export declare class Token {
    type: TokenType;
    value: string;
    constructor(type: TokenType, value: string);
}
