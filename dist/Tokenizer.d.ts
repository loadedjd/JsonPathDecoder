import { Token } from "./types/Token.type";
export declare class Tokenizer {
    tokens: Array<Token>;
    constructor(path: string);
    private tokenize;
    private parseRegex;
    private parseNumber;
    private parseString;
    private reverseString;
}
