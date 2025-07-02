# members-only
A simple members only forum with passport login authentication in node.js and express

## Features

- User authentication with Passport.js
- Conditional rendering based on membership level
- Role-based access control (basic, clubhouse, admin)
- Authenticated users can create and view messages
- Admins can delete any post

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Passport.js
- bcrypt.js
- EJS

## Getting Started

run the following in your terminal to install all dependencies
```
npm install
```
### Setting up a local database

Make sure that you have psql downloaded
Then you will need to run psql and use the command to create a local database
```
CREATE DATABASE <database-name>
```

and make sure to connect to it via:
```
\c <database-name>
```
Then make a copy of the .env-template and create your local .env file.
You will need to add in your local role name and password, as well as your local database name.

You will also need to create your own secure SESSION_SECRET to be used for the passport login session.

Create a custom code for the CLUBHOUSE_CODE which will grant user clubhouse membership and create a custom code for ADMIN_CODE which will grant a user admin status.

Then you can run the command in your terminal to seed data
```
node seed.js
```

## Setting up your production database

If you would like to use this app for your own purposes you just need to setup your own production-level database. Then configure your .env with the DATABASE_URL 
Next, you can run the following command in your database to initialize all of the necessary tables to get started:

```
node setup.js
```

## Membership types

There are three membership types.

Basic - Automatically assigned to every user upon sign-up. Allows the user to view messages or post their own, but they cannot see the date and author of posts.

Clubhouse - Members who enter in the clubhouse membership will be upgraded to clubhouse membership where they can ALSO see the timestamp and author of posts.

Admin - Members who provide the admin code in the clubhouse form will be upgraded to admin status. They have all the abilities of clubhouse members, but they can ALSO delete posts.

## Database Schema

Database contains the following two tables and columns:

### users
  - id (PK)
  - firstname
  - lastname
  - username
  - password
  - membership

### messages
  - id (PK)
  - title
  - content
  - created_at
  - user_id (FK → users.id)

Relationship: One-to-many (one user can have many messages)
