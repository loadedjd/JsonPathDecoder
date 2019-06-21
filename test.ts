import { JSONPathDecoder } from './JSONPathDecoder';
let testObject = {
    "name" : "Jared",
    "age" : 21,
    "account" : {
        "email" : "williamsjared62@gmail.com",
        "password" : "R#@#",
        "passwordHash" : "ER^FGWGUOFG*"
    }
}

console.log(JSONPathDecoder.decode(testObject, 's.email'));

