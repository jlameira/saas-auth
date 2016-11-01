# saas-auth

#first run Mongodb
mongod

#Run app
nodemon app.js

#Register method POST
http://localhost:3000/user/register

In body add "email", "password"

#Authenticate method POST
In body add "email", "password"

http://localhost:3000/user/authenticate

-> "Copy token generated"

ex: "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.........



#Dashboard method GET
http://localhost:3000/dashboard

add "Authorization" and your token generated in Authenticate
