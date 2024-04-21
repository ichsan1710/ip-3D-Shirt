# Individual Project 3D Shirt Open AI API

## Endpoints

List of available endpoints:

- `POST /login`
- `POST /register`
- `POST /google-login`
- `POST /dalle`
- `POST /my-favorites`
- `GET /my-favorites/:id`
- `DELETE /my-favorites/:id`
- `GET /my-profile/:id`
- `PUT /my-profile/:id`

### 1. POST /login

#### Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response (200 - OK)

```json
{
  "access_token": "string",
  "user": {
    "id": "integer",
    "userName": "string",
    "email": "string"
  }
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Invalid Email/Password"
}
```

### 2. POST /register

#### Request:

- body:

```json
{
  "userName": "string",
  "email": "string",
  "password": "string"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (201 - Created)

```json
{
  "userName": "string",
  "email": "string"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Please input email!"
}
OR
{
  "message": "Please input username!"
}
OR
{
  "message": "Must be in email format"
}
OR
{
  "message": "Email is already registered. Please input another email"
}
OR
{
  "message": "Username is already registered. Please input another username"
}
OR
{
  "message": "Please input password!"
}
OR
{
  "message": "Password must contain at least 8 characters"
}
```

### 3. POST /google-login

#### Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response (200 - OK)

```json
{
  "access_token": "string",
  "user": {
    "id": "integer",
    "userName": "string",
    "email": "string"
  }
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Invalid Email/Password"
}
```

### 4. POST /dalle

#### Request:

- body:

```json
{
  "prompt": "string"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK)

```json
{
  "photo": "string"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Please input prompt!"
}
```

### 5. POST /my-favorites

#### Request:

- body:

```json
{
  "imgUrl": "string"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (201 - OK)

```json
{
  "message": `successfully added image to favorites`
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "File is required"
}
```

### 6. GET /my-favorites/:id

#### Description:

- Get favorites by UserId

#### Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

#### Response (200 - OK)

```json
{
    {
        "id": "integer",
        "imgUrl": "string",
        "UserId": "integer",
        "createdAt": "string",
        "updatedAt": "string"
    }
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Error not found"
}
```

### 7. DELETE /my-favorites/:id

#### Description:

- Delete favorites by id

#### Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

#### Response (200 - OK)

```json
{
  "message": `successfully remove favorite from my favorites`
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Error not found"
}
```

### 8. GET /my-profile/:id

#### Description:

- Get user profile by id

#### Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

#### Response (200 - OK)

```json
{
  "id": "integer",
  "userName": "string",
  "email": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Error not found"
}
```

### 9. PUT /my-profile/:id

#### Request:

- body:

```json
{
  "userName": "string",
  "email": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK)

```json
{
  "userName": "string",
  "email": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Error not found"
}
```

### Global Error

#### Response (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```
