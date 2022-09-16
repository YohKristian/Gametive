## Endpoints :

List of available endpoints:

- `POST /midtrans/snap-token`

## 1. POST Midtrans Token

Description:

- Get Snap Token by sending price

Request :

- Method : POST
- Endpoint : `/midtrans/snap-token`
- Header :
  - access_token: "string"

Response :

_Response (201 - Created)_

```json
"string"
```

_Response (404 - Bad Request)_

```json
{
  "code": "integer",
  "message": "string"
}
```
