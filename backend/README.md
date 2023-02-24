# aura-git backend

This is the official Aura 23 Back-end.

## How to run?

1. Clone the repository.
2. Run the command `npm i` in the _backend_ directory to install necessary dependencies.
3. Create a _.env_ file and:
   - Create a "**PORT**" variable and set a port for the Express server.
   - Create a "**DB**" variable and set the Mongoose connection string (without query parameters).
   - Create a "**NODEMAILER_EMAIL**" variable and set the Gmail account email id.
   - Create a "**NODEMAILER_PASS**" variable and set the Gmail account app password.
   - Create a "**JWT_SECRET**" variable and set a strong JsonWebToken secret.
4. Run the application using `npm start`.
