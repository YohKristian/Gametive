# API Spec Teams

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
## 1. Fetch All Teams
Request :
- Method : GET
- Endpoint : `/teams/all-teams`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
[
    {
        "id": "integer",
        "name": "string",
        "CaptainName": "string",
        "MemberName1": "string",
        "MemberName2": "string",
        "MemberName3": "string",
        "MemberName4": "string",
        "BenchMemberName1": "string",
        "BenchMemberName2": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

## 2. Fetch Team By Id
Request :
- Method : GET
- Endpoint : `/teams/:teamId`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "id": "integer",
    "name": "string",
    "CaptainName": "string",
    "MemberName1": "string",
    "MemberName2": "string",
    "MemberName3": "string",
    "MemberName4": "string",
    "BenchMemberName1": "string",
    "BenchMemberName2": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```



## 3. Add Teams
Request :
- Method : POST
- Endpoint : `/teams/create`
- Header :
    - acces_token : "your secret access token"
- Body :
```json
{
    "name": "string",
    "CaptainName": "string",
    "MemberName1": "string",
    "MemberName2": "string",
    "MemberName3": "string",
    "MemberName4": "string",
    "BenchMemberName1": "string",
    "BenchMemberName2": "string",
}
```

Response :
- 200 OK
```json
{
    "id": "integer",
    "name": "string",
    "CaptainName": "string",
    "MemberName1": "string",
    "MemberName2": "string",
    "MemberName3": "string",
    "MemberName4": "string",
    "BenchMemberName1": "string",
    "BenchMemberName2": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

## 4. Update Team By Id
Request :
- Method : PUT
- Endpoint : `/teams/edit/:teamId`
- Header :
    - acces_token : "your secret access token"
- Body :
```json
{
    "name": "string",
    "CaptainName": "string",
    "MemberName1": "string",
    "MemberName2": "string",
    "MemberName3": "string",
    "MemberName4": "string",
    "BenchMemberName1": "string",
    "BenchMemberName2": "string",
}
```

Response :
- 200 OK
```json
{
    "id": "integer",
    "name": "string",
    "CaptainName": "string",
    "MemberName1": "string",
    "MemberName2": "string",
    "MemberName3": "string",
    "MemberName4": "string",
    "BenchMemberName1": "string",
    "BenchMemberName2": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

## 5. Delete Team By Id
Request :
- Method : DEL
- Endpoint : `/teams/delete/:teamId`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "message" : "Success Delete Team"
}
```
```