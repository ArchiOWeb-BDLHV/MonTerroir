## Requête

`GET /users/`

## Réponse

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

## Erreurs

> `401` : Pas autorisé

```json
{
  "success": false,
  "message": "Unauthenticated",
  "data": []
}
```
