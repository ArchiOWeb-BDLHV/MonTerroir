## Request

`POST /conversations/:id/messages`

## Body

```json
{
  "content": "MESSAGE"
}
```

## Responses

> `201` : Created

```json
  {
    "content": "test",
    "conversation": "123456",
    "_id": "2345678",
    "date": "YYYY-MM-DDTH:I:S.943Z",
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
  "message": "Message validation failed: content: Path `content` is required."
}
```
