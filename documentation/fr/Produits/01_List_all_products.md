## Request

`GET /api/products/`

## Responses

> `200` : OK

```json
[
  {
    "name": "Miel",
    "description": "Miel de fleure",
    "price": 8.5,
    "category": "miel",
    "image_url": "https://monImage.jpg"
  },
  {
    "name": "Fromage",
    "description": "Tome vaudoise",
    "price": 3.5,
    "category": "laiterie",
    "image_url": "https://monImageLait.jpg"
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
