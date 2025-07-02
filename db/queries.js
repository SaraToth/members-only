const pool = require("./pool");

const createUser = async (firstName, lastName, username, password) => {
    await pool.query("INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, 'basic')", [firstName, lastName, username, password]);
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

const getAllMessages = async() => {
    const { rows } = await pool.query("SELECT messages.id, firstname, lastname, title, content, created_at FROM messages INNER JOIN users ON messages.user_id = users.id");
    return rows;
};

const deleteMessage = async(messageId) => {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
};

const doesEmailExist = async(username) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return (rows.length > 0);
};

module.exports = { createUser, findUserByUsername, upgradeMembership, postNewMessage, getAllMessages, deleteMessage, doesEmailExist };