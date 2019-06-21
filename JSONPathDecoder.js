"use strict";
exports.__esModule = true;
var Tokenizer_1 = require("./Tokenizer");
var TokenType_enum_1 = require("./types/TokenType.enum");
var JSONPathDecoder = /** @class */ (function () {
    function JSONPathDecoder() {
    }
    JSONPathDecoder.decode = function (object, path) {
        var tokenizer = new Tokenizer_1.Tokenizer(path);
        var runningObject = object;
        tokenizer.tokens.reverse().forEach(function (token) {
            var tokenPath = token.value;
            var tokenType = token.type;
            try {
                if (tokenType == TokenType_enum_1.TokenType.String) { // Normal
                    runningObject = JSONPathDecoder.solveString(tokenPath, runningObject);
                }
                else if (tokenType == TokenType_enum_1.TokenType.Number) { // Array
                    runningObject = JSONPathDecoder.solveNumber(tokenPath, runningObject);
                }
                else {
                    runningObject = JSONPathDecoder.solveRegex(tokenPath, runningObject);
                }
            }
            catch (e) {
                console.log(e);
                return undefined;
            }
        });
        return runningObject;
    };
    JSONPathDecoder.solveRegex = function (reg, runningObject) {
        var rege = new RegExp("" + reg);
        var returnArray = [];
        runningObject.forEach(function (item) {
            Object.keys(item).forEach(function (key) {
                if (rege.test(key)) {
                    returnArray.push(item[key]);
                }
            });
        });
        return returnArray;
    };
    JSONPathDecoder.solveString = function (path, runningObject) {
        var returnOject = [];
        if (Array.isArray(runningObject)) {
            runningObject.forEach(function (item) {
                returnOject.push(item[path]);
            });
        }
        else {
            returnOject.push(runningObject[path]);
        }
        return returnOject;
    };
    JSONPathDecoder.solveNumber = function (path, runningObject) {
        var returnOject = [];
        if (Array.isArray(runningObject)) {
            runningObject.forEach(function (item) {
                returnOject.push(runningObject[path]);
            });
        }
        else {
            returnOject.push(runningObject[path]);
        }
        return returnOject;
    };
    return JSONPathDecoder;
}());
exports.JSONPathDecoder = JSONPathDecoder;
