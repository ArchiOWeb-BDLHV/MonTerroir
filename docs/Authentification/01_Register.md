## Request

`POST /auth/register`

## Body

```json
{
  "username": "jonh.doe",
  "password": "password"
}
```

## Responses

> `200` : Ok

```json
  {
    "user": {
        "username": "joe",
        "_id": "123456"
    },
    "accessToken": "123456787654321"
},
```

## Errors

> `401` : Not authorized

```json
{
  "message": "Unauthenticated"
}
```

> `422` : Unprocessable Entity

```json
{
  "message": "Username and password are required"
}
```
