## Request

`GET /messages/`

## Responses

> `200` : OK

```json
[
{
    "user": "fromageOwner",
    "horaire": "10:20",
    "description": "Bonjour John, les produits sont disponibles quand vous voulez.",
  },
  {
    "user": "John",
    "horaire": "10:15",
    "description": "Salut, je suis très interessé par ton offre des fromages.",
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
