# JSONPathDecoder
JSONPathDecoder is a library designed to help you easily parse lengthy json config files, or just any json at all

## Installation

```
npm i jsonpathdeocder
const jpd = require('jsonpathdecoder');
```

## Normal Usage
```
let testObject = {
    "accounts" : [
        {
            "name" : "Jared",
            "email" : "jared@npm.org"
        },

        {
            "name" : "Archie",
            "email" : "archie@littlehouseontheprarie.com"
        }
    ]
}

let returnValue = JSONPathDecoder.decode(testObject,'accounts.name');

// OUTPUT: ["Jared", "Archie"]
```

## Array Usage

```
let testObject = {
    "accounts" : [
        {
            "name" : "Jared",
            "email" : "jared@npm.org"
        },

        {
            "name" : "Archie",
            "email" : "archie@littlehouseontheprarie.com"
        }
    ]
}

let returnValue = JSONPathDecoder.decode(testObject,'accounts.[0]');

// OUTPUT: {
                "name" : "Jared",
                "email" : "jared@npm.org"
            }

```

## Regex Usage

```
let testObject = {
    "accounts" : [
        {
            "name" : "Jared",
            "email" : "jared@npm.org"
        },

        {
            "name" : "Archie",
            "email" : "archie@littlehouseontheprarie.com"
        }
    ]
}

let returnValue = JSONPathDecoder.decode(testObject,'accounts./n.*/');

// OUTPUT: ["Jared", "Archie"]
```