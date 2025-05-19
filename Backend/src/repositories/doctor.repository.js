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
            'INSERT INTO doctors (user_id, specialization, hospital_id) VALUES ($1, $2, $3) RETURNING *',
            [doctor.user_id, doctor.specialization, doctor.hospital_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating doctor', error);
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
            'UPDATE doctors SET user_id = $1, specialization = $2, hospital_id = $3 WHERE id = $4 RETURNING *',
            [doctor.user_id, doctor.specialization, doctor.hospital_id, doctor.id]
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
