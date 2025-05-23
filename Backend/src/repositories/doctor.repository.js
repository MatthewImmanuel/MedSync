const db = require('../database/pg.database');

exports.getAllDoctors = async () => {
    try {
        const result = await db.query('SELECT * FROM doctors');
        return result.rows;
    } catch (error) {
        console.error('Error fetching doctors', error);
    }
};

exports.createDoctor = async (doctor) => {
    try {
        const result = await db.query(
            'INSERT INTO doctors (user_id, name, specialization, hospital_id, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [doctor.user_id, doctor.name, doctor.specialization, doctor.hospital_id, doctor.photo_url || null]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating doctor', error);
    }
};

exports.getDoctorByUserId = async (userId) => {
    try {
        const result = await db.query('SELECT * FROM doctors WHERE user_id = $1', [userId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching doctor by user ID', error);
    }
};

exports.getDoctorById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM doctors WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching doctor by ID', error);
    }
};

exports.updateDoctor = async (doctor) => {
    try {
        const result = await db.query(
            'UPDATE doctors SET user_id = $1, name = $2, specialization = $3, hospital_id = $4 WHERE id = $5 RETURNING *',
            [doctor.user_id, doctor.name, doctor.specialization, doctor.hospital_id, doctor.id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating doctor', error);
    }
};

exports.deleteDoctor = async (id) => {
    try {
        const doctor = await db.query('SELECT * FROM doctors WHERE id = $1', [id]);
        await db.query('DELETE FROM doctors WHERE id = $1', [id]);
        return doctor.rows[0];
    } catch (error) {
        console.error('Error deleting doctor', error);
    }
};

