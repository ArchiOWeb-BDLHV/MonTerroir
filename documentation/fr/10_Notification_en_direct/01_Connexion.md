## Requète de connexion

`wss://mon-terroir.onrender.com`

## Headers

```json
{
  "Authorization": "Bearer <token>"
}
```

## Messages

```json
{
  "data": {
    "message": "MESSAGE",
    "conversation": {
      "id": "123456",
      "name": "Conversation name"
    },
    "sender": {
      "id": "123456",
      "username": "Username"
    },
    "date": "2021-01-01T00:00:00.000Z"
  },
  "code": "CODE"
}
```

## Codes

    - NEW_MESSAGE
    - NEW_CONVERSATION
