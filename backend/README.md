# aura-23 backend

This is the official Aura 23 backend application.

## How to Run?

1. Clone the repository.
2. Install required dependencies by running `npm install` (both in the project root directory, as well as in the _backend_ directory).
3. Create a `.env` file in the backend directory, and:
   - Create a new `PORT` variable and assign an appropriate port (for example, _3000_).
   - Create a new `DB_URI` variable and assign the mongoose connection string to it (omit possible query parameters).
4. Run `npm start` to start the backend application.
