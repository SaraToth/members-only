const pool = require("./pool");

const createUser = async (firstName, lastName, userName, password) => {
    await pool.query("INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, 'basic')", [firstName, lastName, userName, password]);
};

const findUserByUsername = async (username) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
};

module.exports = { createUser, findUserByUsername };