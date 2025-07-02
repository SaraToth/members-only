const pool = require("./pool");

const createUser = async (firstName, lastName, userName, password) => {
    await pool.query("INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, 'basic')", [firstName, lastName, userName, password]);
};

const findUserByUsername = async (username) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
};

const upgradeMembership = async(userId, membership) => {
    await pool.query("UPDATE users SET membership = $1 WHERE id = $2", [membership, userId]);
};

const postNewMessage = async(title, content, userId) => {
    const timestamp = new Date();
    await pool.query("INSERT INTO messages (title, content, user_id, created_at) VALUES ($1, $2, $3, $4)", [title, content, userId, timestamp]);
};

module.exports = { createUser, findUserByUsername, upgradeMembership, postNewMessage };