# User Auth

User Authentication with passport.js, node, express - web app

## Session

session vs cookie vs local storage

session: on the server side - secure then cookies

cookie: sent in request to server

local storage: can write only with JavaScript. local

## The Process

1. cookie sets value of session id
2. express-session middleware gets the session id and look up for it
3. if session valid -> ex) authenticate user
