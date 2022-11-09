## Request

`GET /users/`

## Responses

> `200` : OK

```json
[
  {
    "_id": 123,
    "name": "John Doe"
  },
  {
    "_id": 345,
    "name": "Jane Doe"
  }
]
```

## Errors

> `401` : Not authorized

```json
{
  "success": false,
  "message": "Unauthenticated",
  "data": []
}
```
