## Request

`PUT /users/:id`

## Body

```json
{
  "name": "NAME"
}
```

## Responses

> `200` : OK

```json
  {
    "_id": 123,
    "name": "John Doe"
  },
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
