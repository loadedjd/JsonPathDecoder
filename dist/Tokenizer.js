"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_type_1 = require("./types/Token.type");
const TokenType_enum_1 = require("./types/TokenType.enum");
class Tokenizer {
    constructor(path) {
        this.tokens = new Array();
        this.tokenize(path);
    }
    tokenize(path) {
        let characters = path.split('');
        while (characters.length !== 0) {
            if (characters[characters.length - 1] === '/') {
                characters.pop();
                characters = this.parseRegex(characters);
            }
            else if ('0123456789'.indexOf(characters[characters.length - 1]) !== -1) {
                characters = this.parseNumber(characters);
            }
            else {
                characters = this.parseString(characters);
            }
        }
    }
    parseRegex(chars) {
        let composedRegex = '';
        while (chars.length !== 0) {
            let nextChar = chars.pop();
            if (nextChar === '/')
                break;
            composedRegex += nextChar;
        }
        if (composedRegex.length !== 0)
            this.tokens.push(new Token_type_1.Token(TokenType_enum_1.TokenType.Regex, this.reverseString(composedRegex)));
        return chars;
    }
    parseNumber(chars) {
        let number = chars.pop();
        this.tokens.push(new Token_type_1.Token(TokenType_enum_1.TokenType.Number, number));
        return chars;
    }
    parseString(chars) {
        let composedString = '';
        while (chars.length !== 0) {
            let nextChar = chars.pop();
            if (nextChar === '.')
                break;
            else
                composedString += nextChar;
        }
        if (composedString.length !== 0)
            this.tokens.push(new Token_type_1.Token(TokenType_enum_1.TokenType.String, this.reverseString(composedString)));
        return chars;
    }
    reverseString(str) {
        if (str.length >= 1) {
            let first = str[0];
            return this.reverseString(str.substr(1)) + first;
        }
        else
            return str.length == 0 ? '' : str[0];
    }
}
exports.Tokenizer = Tokenizer;
