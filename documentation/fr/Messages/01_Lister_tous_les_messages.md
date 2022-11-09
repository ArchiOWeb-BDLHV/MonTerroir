## Request

`GET /api/conversations/:id/messages`

## Responses

> `200` : OK

```json
[
  {
    "_id": "123456",
    "content": "message",
    "conversation": "2345678",
    "date": "2022-11-07T07:47:42.309Z",
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
