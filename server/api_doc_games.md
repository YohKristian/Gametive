# API Spec Games

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

## 1. Fetch All Games
Request :
- Method : GET
- Endpoint : `/games`

Response :
- 200 OK
```json

{
    "totalItems": "integer",
    "products" : [
            {
                "id": "integer",
                "name": "string",
                "gameImg": "string",
                "youtubeUrl": "string",
                "gameUrl": "string",
                "releaseDate": "date",
                "developer": "string",
                "genre": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        ],
    "totalPages": "integer",
    "currentPage": "integer",
},

```

- 400 Not Found
```json
{
    "message": "game not found"
}
```

## 2. Create Game
Request :
- Method : POST
- Endpoint : `/games`
- Header :
    - acces_token : "your secret access token"
- Body :
```json
{
    "name": "string",
    "gameImg": "string",
    "youtubeUrl": "string",
    "gameUrl": "string",
    "releaseDate": "date",
    "developer": "string",
    "genre": "string",
}
```

Response :
- 201 OK
```json
{
    "id": "integer",
    "name": "string",
    "gameImg": "string",
    "youtubeUrl": "string",
    "gameUrl": "string",
    "releaseDate": "date",
    "developer": "string",
    "genre": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

## 3. Fetch Game By Id
Request :
- Method : GET
- Endpoint : `/events/{gamesId}`

Response :
- 200 OK
```json
{
    "id": "{gamesId}",
    "name": "string",
    "gameImg": "string",
    "youtubeUrl": "string",
    "gameUrl": "string",
    "releaseDate": "date",
    "developer": "string",
    "genre": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

- 400 Not Found
```json
{
    "message": "game not found"
}
```

## 4. Update Game By Id
Request :
- Method : PUT
- Endpoint : `/games/{gamesId}`
- Header :
    - acces_token : "your secret access token"
- Body :
```json
{
    "name": "string",
    "gameImg": "string",
    "youtubeUrl": "string",
    "gameUrl": "string",
    "releaseDate": "date",
    "developer": "string",
    "genre": "string",
}
```

Response :
- 200 OK
```json
{
    "message": "Success update game {name}"
}
```

- 400 Not Found
```json
{
    "message": "game not found"
}
```

## 5. Delete Game By Id
Request :
- Method : DELETE
- Endpoint : `/games/{gamesId}`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "message": "Success delete game {name}"
}
```

- 400 Not Found
```json
{
    "message": "game not found"
}
```