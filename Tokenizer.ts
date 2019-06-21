import { Token } from "./types/Token.type";
import { TokenType } from './types/TokenType.enum';

export class Tokenizer {
    public tokens: Array<Token>;

    constructor(path: string) {
        this.tokens = new Array<Token>();
        this.tokenize(path);
    }

    private tokenize(path: string) {
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
    private parseRegex(chars: string[]): string[] {
        let composedRegex = '';
        while (chars.length !== 0 ) {
            let nextChar = chars.pop();
            if (nextChar === '/')
                break;
                
            composedRegex += nextChar;
        }

        if (composedRegex.length !== 0)
            this.tokens.push(new Token(TokenType.Regex, this.reverseString(composedRegex)));

        return chars;
    }

    private parseNumber(chars: string[]): string[] {
        let number = chars.pop();
        this.tokens.push(new Token(TokenType.Number, number));
        return chars;
    }

    private parseString(chars: string[]): string[] {
        let composedString = '';

        while (chars.length !== 0) {
            let nextChar = chars.pop();
            if (nextChar === '.')
                break;
            else
                composedString += nextChar;
        }

        if (composedString.length !== 0)
            this.tokens.push(new Token(TokenType.String, this.reverseString(composedString)));

        return chars;
    }

    private reverseString(str: string): string {
        if (str.length >= 1) {
            let first = str[0];
            return this.reverseString(str.substr(1)) + first;
        } else
            return str.length == 0 ? '' : str[0];
    }
}

