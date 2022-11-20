# TesseveApi

## Installation

To install this app in local :
```bash
git clone https://github.com/Tesseve/MonTerroir
cd MonTerroir
cp .env.example .env
npm install
npm run - generateKey
npm run dev
```

You can then update the key in the .env file for example : 

```bash
DB_CONNECTION="mongodb://localhost:27017/tesseve"
PORT=3000
JWT_EXPIRES_IN=1d
```

## RealTime endpoint

To use the realtime endpoint, open a connexion to wss://mon-terroir.onrender.com
Then, you will receive different datas when something append on the chat section. 

```json

{
    "message": {
        "data": {
            "message": {
                "id": "6377a3ea213fd71052a12ad3",
                "content": "MESSAGE"
            },
            "conversation": {
                "id": "6377a3a2213fd71052a12acb",
                "name": "NAME"
            },
            "sender": {
                "id": "63725469318e318232053d09",
                "username": "USERNAME"
            },
            "date": "2022-11-18T15:25:30.751Z"
        }
    },
    "code": "NEW_MESSAGE"
}

```

The code can change and say what to do.

There is 4 differents codes:
- NEW_MESSAGE
- NEW_CONVERSATION
- UPDATE_MESSAGE
- DELETE_MESSAGE

## Full Documentation

You can find the full documentation on https://mon-terroir.stoplight.io/docs/mon-terroir/

Or get the OpenAPI Json on https://stoplight.io/api/v1/projects/mon-terroir/mon-terroir/nodes/reference/Mon-Terroir.json
