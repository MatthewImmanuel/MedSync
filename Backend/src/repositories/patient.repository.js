const db = require('../database/pg.database');

exports.getAllPatients = async () => {
    try {
        const result = await db.query('SELECT * FROM patients');
        return result.rows;
    } catch (error) {
        console.error('Error fetching patients', error);
    }
};

exports.createPatient = async (patient) => {
    try {
        const result = await db.query(
            'INSERT INTO patients (name, age, address) VALUES ($1, $2, $3) RETURNING *',
            [patient.name, patient.age, patient.address]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating patient', error);
    }
};

exports.getPatientById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM patients WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching patient by ID', error);
    }
};

exports.updatePatient = async (patient) => {
    try {
        const result = await db.query(
            'UPDATE patients SET name = $1, age = $2, address = $3 WHERE id = $4 RETURNING *',
            [patient.name, patient.age, patient.address, patient.id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating patient', error);
    }
};

exports.deletePatient = async (id) => {
    try {
        const patient = await db.query('SELECT * FROM patients WHERE id = $1', [id]);
        await db.query('DELETE FROM patients WHERE id = $1', [id]);
        return patient.rows[0];
    } catch (error) {
        console.error('Error deleting patient', error);
    }
};
