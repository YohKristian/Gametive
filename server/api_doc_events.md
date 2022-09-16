# API Spec Events

## Authentication

Request :
- Header :
    - acces_token : "your secret access token"

Response : 
- 500 Internal Server Error
```json
{
    "message": {
        "name": "JsonWebTokenError",
        "message": "invalid signature"
    }
}
```
## 1. Fetch All Events
Request :
- Method : GET
- Endpoint : `/events`

Response :
- 200 OK
```json
{
    "totalItems" : "integer",
    "items" : [
            {
            "id": "integer",
            "name": "string",
            "description": "text",
            "price": "integer",
            "rules": "text",
            "eventStatus": "string",
            "eventPoster": "text",
            "eventDate": "date",
            "eventType": "string",
            "UserId": "integer",
            "GameId": "integer",
            "LocationId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "UserId": "integer",
            "GameId": "integer",
            "LocationId": "integer",
            "Game": "object",
            "Location": "object"
        },
    ],
    "totalPages" : "integer",
    "currentPage" : "integer"
}
```

## 2. Fetch All Events (For Admin)
Request :
- Method : GET
- Endpoint : `/events/admin`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "totalItems" : "integer",
    "items" : [
            {
            "id": "integer",
            "name": "string",
            "description": "text",
            "price": "integer",
            "rules": "text",
            "eventStatus": "string",
            "eventPoster": "text",
            "eventDate": "date",
            "eventType": "string",
            "UserId": "integer",
            "GameId": "integer",
            "LocationId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "UserId": "integer",
            "GameId": "integer",
            "LocationId": "integer",
            "Game": "object",
            "Location": "object"
        },
    ],
    "totalPages" : "integer",
    "currentPage" : "integer"
}
```

## 3. Fetch User's Events (For User)
Request :
- Method : GET
- Endpoint : `/events/forUser`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "totalItems" : "integer",
    "items" : [
            {
            "id": "integer",
            "name": "string",
            "description": "text",
            "price": "integer",
            "rules": "text",
            "eventStatus": "string",
            "eventPoster": "text",
            "eventDate": "date",
            "eventType": "string",
            "UserId": "integer",
            "GameId": "integer",
            "LocationId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "UserId": "integer",
            "GameId": "integer",
            "LocationId": "integer",
            "Game": "object",
            "Location": "object"
        },
    ],
    "totalPages" : "integer",
    "currentPage" : "integer"
}
```

## 4. Add Event
Request :
- Method : POST
- Endpoint : `/events/add`
- Header :
    - acces_token : "your secret access token"
- Body :
```json
{
    "eventName": "string",
    "description": "text",
    "price": "integer",
    "rules": "text",
    "eventPoster": "text",
    "eventDate": "date",
    "eventType": "string",
    "GameId": "integer",
    "LocationName": "string",
    "ProvinceId": "string",
    "RegencyId": "string"
}
```

Response :
- 200 OK
```json
[
    {
        "id": "integer",
        "name": "string",
        "description": "text",
        "price": "integer",
        "rules": "text",
        "eventStatus": "string",
        "eventPoster": "text",
        "eventDate": "date",
        "eventType": "string",
        "UserId": "integer",
        "GameId": "integer",
        "LocationId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "UserId": "integer",
        "GameId": "integer",
        "LocationId": "integer",
    },
    ...
]
```

## 5. Fetch Event By Id
Request :
- Method : GET
- Endpoint : `/events/{id}`

Response :
- 200 OK
```json
{
    "id": "integer",
    "name": "string",
    "description": "text",
    "price": "integer",
    "rules": "text",
    "eventStatus": "string",
    "eventPoster": "text",
    "eventDate": "date",
    "eventType": "string",
    "UserId": "integer",
    "GameId": "integer",
    "LocationId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Game": "object",
    "Location": "object"
}
```
## 6. Update Event Bracket By Id
Request :
- Method : PUT
- Endpoint : `/events/{id}/bracket`
- Header :
    - acces_token : "your secret access token"
- Body :
```json
{
    "bracket": "string"
}
```

Response :
- 200 OK
```json
{ 
    "event" : "string",
    "message": "bracket has been changed"
}
```

## 7. Update Event By Id
Request :
- Method : PUT
- Endpoint : `/events/{id}`
- Header :
    - acces_token : "your secret access token"
- Body :
```json
{
    "eventName": "string",
    "description": "text",
    "price": "integer",
    "rules": "text",
    "eventPoster": "text",
    "eventDate": "date",
    "eventType": "string",
    "GameId": "integer",
    "LocationName": "string",
    "ProvinceId": "string",
    "RegencyId": "string"
}
```

Response :
- 200 OK
```json
{
    "message": "Success edit event"
}
```

## 8. Patch Event Status By Id
Request :
- Method : PUT
- Endpoint : `/events/{id}`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "id": "{id}",
    "name": "string",
    "description": "text",
    "price": "integer",
    "rules": "text",
    "eventStatus": "Inactive",
    "eventPoster": "text",
    "eventDate": "date",
    "eventType": "string",
    "UserId": "integer",
    "GameId": "integer",
    "LocationId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Game": "object",
    "Location": "object"
}
```