"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tokenizer_1 = require("./Tokenizer");
const TokenType_enum_1 = require("./types/TokenType.enum");
class JSONPathDecoder {
    static decode(object, path) {
        let tokenizer = new Tokenizer_1.Tokenizer(path);
        return JSONPathDecoder.parse(tokenizer.tokens, object);
    }
    static parse(tokens, object) {
        const token = tokens.pop();
        let runningObject = object;
        if (token && token.type === TokenType_enum_1.TokenType.String) {
            if (Array.isArray(object)) {
                var tempArray = new Array();
                object.forEach(item => {
                    const tokensCopy = [...tokens];
                    tokensCopy.push(token);
                    tempArray.push(this.parse(tokensCopy, item));
                });
                runningObject = tempArray;
            }
            else {
                if (tokens.length > 0) {
                    runningObject = JSONPathDecoder.parse(tokens, object[token.value]);
                }
                else {
                    runningObject = object[token.value];
                }
            }
        }
        else if (token && token.type === TokenType_enum_1.TokenType.Number) {
            if (Array.isArray(object)) {
                runningObject = this.parse(tokens, object[+token.value]);
            }
            else
                return undefined;
        }
        else if (token && token.type === TokenType_enum_1.TokenType.Regex) {
            let tempArray = new Array();
            let keys = Object.keys(object);
            let regex = new RegExp(token.value);
            keys.forEach(key => {
                if (regex.test(key)) {
                    tempArray.push(object[key]);
                }
            });
            runningObject = tempArray;
            JSONPathDecoder.parse(tokens, runningObject);
        }
        return runningObject;
    }
}
exports.JSONPathDecoder = JSONPathDecoder;
