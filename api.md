# Room

```json
{
    "id": "3a266b79-9e90-43a7-9ceb-338cbf8207cc",
    "name": "Quarto casal",
    "description": "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats.",
    "capacity": 2,
    "beds": 1,
    "photo": "https://images.com/3a266b79"
}
```

# Search

Input:
- checkin: "2024-03-20"
- checkout: "2024-03-22"

```json
[
    {
        "roomId": "3a266b79-9e90-43a7-9ceb-338cbf8207cc",
        "availableQuantity": 7,
        "rates": [
            {
                "date": "2024-03-20",
                "defaultPrice": 119.80,
                "prices": [
                    { "amount": 119.80, "guests": 2, "paymentMethod": "pix" },
                    { "amount": 109.80, "guests": 1, "paymentMethod": "pix" },
                ]
            },
            {
                "date": "2024-03-21",
                "defaultPrice": 129.80,
                "prices": [
                    { "amount": 129.80, "guests": 2, "paymentMethod": "pix" },
                    { "amount": 119.80, "guests": 1, "paymentMethod": "pix" },
                ]
            }
        ]
    }
]
```

# Book

## Request

```json
{
    "hotelId": "89e18dcf-a364-4ef1-933a-ab96317fe58e",
    "checkin": "2024-04-20",
    "checkout": "2024-04-22",
    // 2 quartos de solteiro (3a266b79) e 1 de casal (42e28016)
    "rooms": [
        {
            "id": "3a266b79-9e90-43a7-9ceb-338cbf8207cc",
            "guests": 1
        },
        {
            "id": "3a266b79-9e90-43a7-9ceb-338cbf8207cc",
            "guests": 1
        },
        {
            "id": "42e28016-41ad-41f6-8eb3-8d5e61298c1e",
            "guests": 2
        },
    ],
    "mainGuest": {
        "name": "Mario Günter Simão",
        "email": "mariogsimao@gmail.com",
        "phone": "24999988330",
        "document": "16304291710"
    },
    "payer": {
        "name": "Mario Günter Simão",
        "email": "mariogsimao@gmail.com",
        "phone": "24999988330",
        "document": "16304291710"
    },
    "paymentMethod": "pix",
    "totalPrice": 1000.00 // preço para bater com valor do backend
}
```

## Response