postman-codegen NodeRED Node
=====================

Installing with npm
-------

`npm install node-red-contrib-postman-codegen`

Adding nodes to the palette
-------
Using the Editor
You can install nodes directly within the editor by selecting the Manage Palette option from the main menu to open the Palette Manager.

The ‘Nodes’ tab lists all of the modules you have installed. It shows which you are using and whether updates are available for any of them.

The ‘Install’ tab lets you search the catalogue of available node modules and install them.

Example
------
- postman code generator wrapper

## Parameters

```javascript
msg = {};
msg.api = 'getOptions'; // convert, getOptions, getLanguageList
msg.language = 'nodejs';
msg.variant = 'request';
// msg.options = { // if api is convert 
//     indentCount: 3,
//     indentType: 'Space',
//     trimRequestBody: true,
//     followRedirect: true
// };
// msg.collection = JSON.parse(COLLECTION_JSON_STRING); // if api is convert 
return msg;
```

Sample Flow
------
```json
[
  {
    "id": "be8bbf3b.85f4f",
    "type": "inject",
    "z": "fd22a74.6706158",
    "name": "",
    "props": [
      {
        "p": "payload"
      },
      {
        "p": "topic",
        "vt": "str"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 100,
    "y": 220,
    "wires": [
      [
        "a9cbfd5d.f01b6"
      ]
    ]
  },
  {
    "id": "a9cbfd5d.f01b6",
    "type": "function",
    "z": "fd22a74.6706158",
    "name": "",
    "func": "msg = {};\nmsg.api = 'convert'; // convert, getOptions, getLanguageList\nmsg['language'] = 'nodejs';\nmsg.variant = 'request';\nmsg.collection = {\"item\":[{\"id\":\"set-utc-time-now\",\"name\":\"Set the current time in UTC\",\"description\":{\"content\":\"Set the current time in UTC\",\"type\":\"text/plain\"},\"request\":{\"url\":{\"path\":[\"utc\",\"settime\"],\"host\":[\"{{apiBaseUrl}}\"],\"query\":[],\"variable\":[]},\"method\":\"POST\",\"body\":{\"mode\":\"urlencoded\",\"urlencoded\":[{\"description\":{\"content\":\"nation code\",\"type\":\"text/plain\"},\"key\":\"nation\",\"value\":\"ko-kr\"},{\"key\":\"nation2\",\"value\":\"ko-kr\"}]}},\"response\":[],\"event\":[]},{\"id\":\"get-utc-time-now\",\"name\":\"Get the current time in UTC\",\"description\":{\"content\":\"Get the current time in UTC\",\"type\":\"text/plain\"},\"request\":{\"url\":{\"path\":[\"utc\",\"now\"],\"host\":[\"{{apiBaseUrl}}\"],\"query\":[{\"key\":\"a\",\"value\":\"a\"}],\"variable\":[]},\"method\":\"GET\"},\"response\":[],\"event\":[]}],\"event\":[],\"variable\":[{\"id\":\"apiBaseUrl\",\"type\":\"string\",\"value\":\"http://localhost\"}],\"info\":{\"_postman_id\":\"5fcc82c4-707f-424b-9de5-5c92460a6802\",\"name\":\"xmysql collection\",\"version\":{\"raw\":\"0.0.1\",\"major\":0,\"minor\":0,\"patch\":1,\"prerelease\":[],\"build\":[],\"string\":\"0.0.1\"},\"schema\":\"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\"}}\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "x": 250,
    "y": 220,
    "wires": [
      [
        "52277e8b.7c474"
      ]
    ]
  },
  {
    "id": "52277e8b.7c474",
    "type": "postman-codegen",
    "z": "fd22a74.6706158",
    "api": "",
    "language": "",
    "variant": "",
    "name": "postman codegen",
    "x": 440,
    "y": 220,
    "wires": [
      [
        "d549985d.758338"
      ]
    ]
  },
  {
    "id": "d549985d.758338",
    "type": "debug",
    "z": "fd22a74.6706158",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "statusVal": "",
    "statusType": "auto",
    "x": 640,
    "y": 220,
    "wires": []
  }
]
```
