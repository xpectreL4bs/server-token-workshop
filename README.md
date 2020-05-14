# server-token-workshop
This workshop explain how to use token and token refresh on server side.

## Lesson 02

On this lesson we will create base code for REST API.


API Schema
/api/v1/{context}

/api/v1/user
  POST =>
  GET
  PUT
  PATCH

/api/v1/user/login
  POST
  {string} username
  {string} password
  {object} data with expiration token

New User=> Register => POST /api/v1/user
Login => POST /api/v1/user/login ?username&password

Dashboard/app => GET /api/v1/user/profile 
  Headers: Bearer [token]

