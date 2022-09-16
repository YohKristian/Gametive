# API Spec Users

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

## 1. Login

Request: 
- Method : POST
- Endpoint: `/users/login`
- Body :
```json
{
  "username": "string, unique",
  "password": "string"
}
```

Response :

- 200 OK
```json
{
  "login": true,
  "access_token": "string"
}
```
- 400 Bad Request
```json
{
  "code": 4,
  "message": "username / password invalid"
}
```


## 2. Register

Request: 
- Method : POST
- Endpoint: `/users/register`
- Body :

```json
{
  "password": "string, unique",
  "email": "string, unique",
  "password": "string"
}
```

Response:
- 200 OK
```json
true
```
- 400 Bad Request
```json
{
    "code": 2,
    "message": "username / email is not available"
}
```
- 400 Bad Request
```json
{
    "message": [
        "email must be unique"
    ]
}
```

## 3. Fetch All History
Request :
- Method : GET
- Endpoint : `/users`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "id": 2,
    "username": "string",
    "email": "string",
    "role": "string",
    "Teams": [Array]
}
```

## 4. Fetch One User
Request :
- Method : GET
- Endpoint : `/users/{username}`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
[
    {
        "id": "number",
        "username": "{username}",
        "email": "string",
        "role": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...
]
```
- 404 Not Found
```json
{
    "code": 404,
    "message": "data not found"
}
```


## 5. Fetch All Users
Request :
- Method : GET
- Endpoint : `/users`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
[
    {
        "id": "number",
        "username": "string",
        "email": "string",
        "role": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...
]
```

## 5. Update Password (customer)
Request :
- Method : PUT
- Endpoint : `/users/{username}`
- Header :
    - acces_token : "your secret access token"
- Body :

```json
{
  "oldPassword" : "string",
  "newPassword" : "string"
}
```

Response :
- 200 OK
```json
{
    "username": "string",
    "message": "password has been changed"
}
```
- 500 Internal Server Error
```json
{
    "message": {
        "code": 8
    }
}
```

## 6. Update Password (admin)
Request :
- Method : PUT
- Endpoint : `/users/{username}`
- Header :
    - acces_token : "your secret access token"
- Body :

```json
{
  "newPassword" : "string"
}
```

Response :
- 200 OK
```json
{
    "username": "string",
    "message": "password has been changed"
}
```
- 500 Internal Server Error
```json
{
    "message": {
        "code": 8
    }
}
```

## 7. Delete User (admin)
Request :
- Method : PUT
- Endpoint : `/users/{userId}`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "id": "integer",
    "message": "user has been deleted"
}
```
- 500 Internal Server Error
```json
{
    "message": {
        "code": 8
    }
}
```

## 8. Delete User (customer)
Request :
- Method : PUT
- Endpoint : `/users/{username}`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "id": "integer",
    "message": "user has been deleted"
}
```
- 500 Internal Server Error
```json
{
    "message": {
        "code": 8
    }
}
```