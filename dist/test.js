"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const JSONPathDecoder_1 = require("./JSONPathDecoder");
const fs = require('fs');
function readConfigFile() {
    return __awaiter(this, void 0, void 0, function* () {
        fs.readFile('./test.json', (err, data) => {
            if (!err && data) {
                let json = JSON.parse(data);
                let returnValue = JSONPathDecoder_1.JSONPathDecoder.decode(json, 'solver_settings.model_import_settings.input_type');
                console.log(returnValue);
            }
        });
    });
}
readConfigFile();
