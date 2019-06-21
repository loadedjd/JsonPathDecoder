"use strict";
exports.__esModule = true;
var Token_type_1 = require("./types/Token.type");
var TokenType_enum_1 = require("./types/TokenType.enum");
var Tokenizer = /** @class */ (function () {
    function Tokenizer(path) {
        this.tokens = new Array();
        this.tokenize(path);
    }
    Tokenizer.prototype.tokenize = function (path) {
        var characters = path.split('');
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
    };
    Tokenizer.prototype.parseRegex = function (chars) {
        var composedRegex = '';
        while (chars.length !== 0) {
            var nextChar = chars.pop();
            if (nextChar === '/')
                break;
            composedRegex += nextChar;
        }
        if (composedRegex.length !== 0)
            this.tokens.push(new Token_type_1.Token(TokenType_enum_1.TokenType.Regex, this.reverseString(composedRegex)));
        return chars;
    };
    Tokenizer.prototype.parseNumber = function (chars) {
        var number = chars.pop();
        this.tokens.push(new Token_type_1.Token(TokenType_enum_1.TokenType.Number, number));
        return chars;
    };
    Tokenizer.prototype.parseString = function (chars) {
        var composedString = '';
        while (chars.length !== 0) {
            var nextChar = chars.pop();
            if (nextChar === '.')
                break;
            else
                composedString += nextChar;
        }
        if (composedString.length !== 0)
            this.tokens.push(new Token_type_1.Token(TokenType_enum_1.TokenType.String, this.reverseString(composedString)));
        return chars;
    };
    Tokenizer.prototype.reverseString = function (str) {
        if (str.length >= 1) {
            var first = str[0];
            return this.reverseString(str.substr(1)) + first;
        }
        else
            return str.length == 0 ? '' : str[0];
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
