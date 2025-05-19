const db = require('../database/pg.database');

exports.getAllUsers = async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users', error);
    }
};

exports.createUser = async (user) => {
    try {
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [user.name, user.email, user.password]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user', error);
    }
};

exports.getUserById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID', error);
    }
};

exports.updateUser = async (user) => {
    try {
        const result = await db.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [user.name, user.email, user.password, user.id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user', error);
    }
};

exports.deleteUser = async (id) => {
    try {
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        return user.rows[0];
    } catch (error) {
        console.error('Error deleting user', error);
    }
};
