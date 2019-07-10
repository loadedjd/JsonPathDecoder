import { JSONPathDecoder } from './JSONPathDecoder';
const fs = require('fs');


async function readConfigFile() {
    fs.readFile('./test.json', (err, data) => {
        if (!err && data) {
            let json = JSON.parse(data);
            let returnValue = JSONPathDecoder.decode(json, 'solver_settings.model_import_settings.input_type');
            console.log(returnValue);
        }
    });
}

readConfigFile();