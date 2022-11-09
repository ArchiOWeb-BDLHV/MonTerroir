## Request

`POST /users/`

## Body

```json
{
  "name": "NAME"
}
```

## Responses

> `201` : Created

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
