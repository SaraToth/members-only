const pool = require("./pool");

const createUser = async (firstName, lastName, userName, password) => {
    await pool.query("INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, 'basic')", [firstName, lastName, userName, password]);
};

const findUserByUsername = async (username) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
};

const upgradeMembership = async(userId) => {
    await pool.query("UPDATE users SET membership = 'clubhouse' WHERE id = $1", [userId]);
};

module.exports = { createUser, findUserByUsername, upgradeMembership };