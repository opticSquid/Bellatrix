/* eslint-disable prettier/prettier */
/**
 * This is your normal user given read write permission to your database
 * Change the username & password and database for your own use
 */
db.createUser({
    user: 'dummy',
    pwd: 'dummy',
    roles: [
        {
            role: 'readWrite',
            db: 'bellatrix',
        },
    ],
});
