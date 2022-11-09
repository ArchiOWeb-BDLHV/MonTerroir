## Request

`GET /api/conversations/`

## Responses

> `200` : OK

```json
[
  {
    "_id": "123456",
    "name": "test",
    "users": ["987654321"],
    "messages": [],
    "__v": 0
  }
]
```

## Errors

> `401` : Not authorized

```json
{
  "message": "Unauthorized. Please login."
}
```
