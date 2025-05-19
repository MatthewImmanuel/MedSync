const db = require('../database/pg.database');

exports.getAllHospitals = async () => {
    try {
        const result = await db.query('SELECT * FROM hospitals');
        return result.rows;
    } catch (error) {
        console.error('Error fetching hospitals', error);
    }
};

exports.createHospital = async (hospital) => {
    try {
        const result = await db.query(
            'INSERT INTO hospitals (name, address) VALUES ($1, $2) RETURNING *',
            [hospital.name, hospital.address]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating hospital', error);
    }
};

exports.getHospitalById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM hospitals WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching hospital by ID', error);
    }
};

exports.updateHospital = async (hospital) => {
    try {
        const result = await db.query(
            'UPDATE hospitals SET name = $1, address = $2 WHERE id = $3 RETURNING *',
            [hospital.name, hospital.address, hospital.id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating hospital', error);
    }
};

exports.deleteHospital = async (id) => {
    try {
        const hospital = await db.query('SELECT * FROM hospitals WHERE id = $1', [id]);
        await db.query('DELETE FROM hospitals WHERE id = $1', [id]);
        return hospital.rows[0];
    } catch (error) {
        console.error('Error deleting hospital', error);
    }
};
