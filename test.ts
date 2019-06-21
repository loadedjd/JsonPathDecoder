import { JSONPathDecoder } from './JSONPathDecoder';
let testObject = {
    "name": "Jared",
    "age": 21,
    "account": {
        "email": "williamsjared62@gmail.com",
        "password": "R#@#",
        "passwordHash": "ER^FGWGUOFG*",
        "aliases": [
            {
                "name": "James",
                "config": {
                    "foods": ["apples", "oranges"]
                }
            },
            {
                "name": "Kevin",
                "config": {
                    "foods": ["apples", "oranges"]
                }
            },
            {
                "name": "Larry",
                "config" : {
                    "foods" : ["apples", "oranges"]
                }
            }]
    }
}

console.log(JSONPathDecoder.decode(testObject, 'account.aliases.name'));

