<p align="center">
<img src="/Public/bellatrix%20solid.png" alt="Bellatrix Logo">
</p>

# BELLATRIX

A Node JS project to provide you with a starter code for your server side application with built in routes and functionalities for the authentication and authorization needs of your application. We mainly focus on the **security** of the authentication and authorization routes

We keep implementing all the latest security measures and best practices that are required for the application's data to remain secure and make sure data and access is available to only the ones intended to. We do the boring security stuff so that you can enjoy your time building other exciting functionalities with out worrying about the security of your application

# We have 2 versions for this app

1. The old version which is built using express.js. As express js is a minimalist framework a lot of structure and security could not be provided to the app. So, it may be susceptible to some attacks
2. The new version. This is being built using `nest.js`. Which is a very stable opinionated framework that gives a lot of structure to the code and follows OOP and MVC model. By default it brings a lot of security to the table and is much more organized which helps the code suitable for implementation in large scale applications.

**Below are the steps to build the old version. The documentation for the new version is in the [new-version](./new-version/) folder.**

> We follow some basic rules for the security of the app.

- We use the [JWT](https://jwt.io/) for the authentication and authorization of the application

- We use an approach of time based token for the authentication and authorization of the application
- For this user gets 2 tokens after successful login. One is called `access_token` **(valid for 15 mins)** and the other is called `refresh_token`
- Every time the user makes a request to a protected route, the `access_token` should be sent in the `Authorization` header

- Everytime the `access_token` expires, the user can request a new `access_token` by sending a **GET** request to `\token` route. The `refresh_token` should be provided in the `Authorization` header of the request

> While keeping an eye on the security we also focus on performance, scalability and reusablity of the code by breaking the code to small middlewares and asynchronizing the processes as much as possible. We parallelize the promises and network requests when ever possible to make the application more performant scalable and reusable.

## Steps to get started

1. Clone the _Bellatrix_ repository.
2. Make sure to install the latest **LTS version of Node JS**
3. After navigating to the project root directory, run the following command:

   ```sh
   npm install
   ```

4. Create a `.env` file in the root of the project. This file will contain the environment variables required for the application to run.
   The file should contain the following fields:

   - `DB_URI` - _URI of the MongoDB database_.
   - `JWT_ACS_SECRET` - _Secret key for the JWT `access_token`_
   - `JWT_REF_SECRET` - _Secret key for the JWT `refresh_token`_

5. Run the following command to start the application in production mode:

   ```sh
   npm start
   ```

6. To start the application in development mode, run the following command:

   ```sh
   npm run dev
   ```
