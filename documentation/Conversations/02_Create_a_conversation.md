## Request

`POST /conversations/`

## Body

```json
{
  "name": "NAME",
  "users": ["USER_ID"]
}
```

## Responses

> `201` : Created

```json
  {
    "name": "NAME",
    "users": ["USER_ID"],
    "_id": "2345678",
    "__v": 0
  },
```

## Errors

> `401` : Not authorized

```json
{
  "message": "Unauthorized. Please login."
}
```

> `422` : Unprocessable Entity

```json
{
  "message": "Message validation failed: content: Path `name` is required."
}
```
