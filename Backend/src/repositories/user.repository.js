const db = require('./../database/pg.database');
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.register = async (user) => {
    try {
        user.password = await bcrypt.hash(user.password, saltRounds);
        const result = await db.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *', [user.email, user.password, user.name]);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query', error);
    }
}

exports.login = async (user) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [user.email]);
        if (result) {
            const match = await bcrypt.compare(user.password, result.rows[0].password);
            if (!match) {
                return null;
            }
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query', error);
    }
}

exports.getAllUsers = async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users', error);
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
