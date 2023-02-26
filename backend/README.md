# aura-git backend

This is the official Aura 23 Back-end.

## How to run?

1. Clone the repository.
2. Run the command `npm i` in the _backend_ directory to install necessary dependencies.
3. Create a _.env_ file and provide with the below fields:

   | Field               | Notes                                     |
   | ------------------- | ----------------------------------------- |
   | PORT                | Express Server port                       |
   | DB                  | Mongoose connection string                |
   | NODEMAILER_EMAIL    | Nodemailer email ID (Gmail SMTP settings) |
   | NODEMAILER_PASS     | Nodemailer password                       |
   | JWT_SECRET          | JsonWebToken secret                       |
   | RAZORPAY_KEY_ID     | Razorpay API Key ID                       |
   | RAZORPAY_KEY_SECRET | Razorpay API Key secret                   |

4. Run the application using `npm start`.
