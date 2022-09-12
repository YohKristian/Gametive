# API Spec Participants

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
## 1. Fetch All Participants
Request :
- Method : GET
- Endpoint : `/participants`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
[
    {
        "id": "integer",
        "TeamId": "integer",
        "EventId": "integer",
        "statusPay": "string",
        "paymentDate": "date",
        "createdAt": "date",
        "updatedAt": "date",
        "Team": {
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
        },
        "Event": {
            "id": "integer",
            "name": "string",
            "description": "text",
            "price": "integer",
            "rules": "text",
            "eventStatus": "string",
            "eventPoster": "string",
            "eventDate": "date",
            "eventType": "string",
            "UserId": "integer",
            "GameId": "integer",
            "LocationId": "integer",
            "Bracket": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    }
]
```

## 2. Fetch Pariticipant By Id
Request :
- Method : GET
- Endpoint : `/participants/{eventId}`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
        "id": "integer",
        "TeamId": "integer",
        "EventId": "integer",
        "statusPay": "string",
        "paymentDate": "date",
        "createdAt": "date",
        "updatedAt": "date",
        "Team": {
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
        },
        "Event": {
            "id": "integer",
            "name": "string",
            "description": "text",
            "price": "integer",
            "rules": "text",
            "eventStatus": "string",
            "eventPoster": "string",
            "eventDate": "date",
            "eventType": "string",
            "UserId": "integer",
            "GameId": "integer",
            "LocationId": "integer",
            "Bracket": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    }
```



## 3. Add Participants
Request :
- Method : POST
- Endpoint : `/events/add`
- Header :
    - acces_token : "your secret access token"
- Body :
```json
{
    "TeamId": "string",
    "EventId": "text",
}
```

Response :
- 200 OK
```json
{
    "id": "integer",
    "TeamId": "integer",
    "EventId": "integer",
    "statusPay": "string",
    "paymentDate": "date",
    "createdAt": "date",
    "updatedAt": "date"
}
```

## 4. Update Pariticipant By Id
Request :
- Method : PUT
- Endpoint : `/participants/:eventId/:teamId`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "id": "integer",
    "TeamId": "integer",
    "EventId": "integer",
    "statusPay": "string",
    "paymentDate": "date",
    "createdAt": "date",
    "updatedAt": "date",
}
```

## 5. Delete Participant By Id
Request :
- Method : DEL
- Endpoint : `/participants/:eventId/:teamId`
- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
{
    "id": "integer",
    "TeamId": "integer",
    "EventId": "integer",
    "statusPay": "string",
    "paymentDate": "date",
    "createdAt": "date",
    "updatedAt": "date",
}
```
```