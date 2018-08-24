# authentication

ReMap Authentication Microservice.

Verify Firebase ID Tokens.

## Authentication

```http
curl / -d '{"id_token": "... token"}'

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 224
Date: Sun, 05 Aug 2018 09:33:41 GMT
Connection: keep-alive

{
  "name": "Shingo Sato",
  "picture": "https://graph.facebook.com/1736908143023349/picture",
  "auth_time": 1533455916,
  "email": "shinsugar@gmail.com",
  "email_verified": true,
  "uid": "sdfsd098f0sd98f"
}
```
