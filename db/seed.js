const { Client } = require("pg");
require("dotenv").config();
const bcrypt = require("bcryptjs");

// Seed users for testing
const users = [
    {
        firstname: "Nick",
        lastname: "Scratch",
        username: "nickscratch@gmail.com",
        password: "Alphabeta3$"
    },

    {
        firstname: "Sabrina",
        lastname: "Spellman",
        username: "sabrinaspellman@gmail.com",
        password: "Alphabeta3$"
    },

    {
        firstname: "Harry",
        lastname: "Potter",
        username: "harrypotter@yahoo.com",
        password: "Alphabeta3$"
    },

    {
        firstname: "Hermione",
        lastname: "Granger",
        username: "hermionegranger@naver.com",
        password: "Alphabeta3$"
    }
];

// SQL commands to create tables
const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username VARCHAR ( 255 ) NOT NULL,
    password VARCHAR ( 255 ) NOT NULL,
    membership TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    user_id INTEGER NOT NULL
);

INSERT INTO users (firstname, lastname, username, password, membership) VALUES ()
`;


async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    await client.connect();
    
    // Create necessary database tables
    await client.query(SQL);

    // Seed test users to users table
    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.query("INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, 'basic')", [user.firstname, user.lastname, user.username, hashedPassword]);
        console.log(`Seeded user: ${user.firstname} ${user.lastname}`);
    }
    await client.end();

    console.log("done");
}

main();