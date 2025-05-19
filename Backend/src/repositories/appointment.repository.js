const db = require('../database/pg.database');

exports.getAllAppointments = async () => {
    try {
        const result = await db.query('SELECT * FROM appointments');
        return result.rows;
    } catch (error) {
        console.error('Error fetching appointments', error);
    }
};

exports.createAppointment = async (appointment) => {
    try {
        const result = await db.query(
            'INSERT INTO appointments (appointment_date, start_time, end_time, doctor_id, patient_id, hospital_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [appointment.appointment_date, appointment.start_time, appointment.end_time, appointment.doctor_id, appointment.patient_id, appointment.hospital_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating appointment', error);
    }
};

exports.getAppointmentById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM appointments WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching appointment by ID', error);
    }
};

exports.updateAppointment = async (appointment) => {
    try {
        const result = await db.query(
            'UPDATE appointments SET appointment_date = $1, start_time = $2, end_time = $3, doctor_id = $4, patient_id = $5, hospital_id = $6 WHERE id = $7 RETURNING *',
            [appointment.appointment_date, appointment.start_time, appointment.end_time, appointment.doctor_id, appointment.patient_id, appointment.hospital_id, appointment.id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating appointment', error);
    }
};

exports.deleteAppointment = async (id) => {
    try {
        const appointment = await db.query('SELECT * FROM appointments WHERE id = $1', [id]);
        await db.query('DELETE FROM appointments WHERE id = $1', [id]);
        return appointment.rows[0];
    } catch (error) {
        console.error('Error deleting appointment', error);
    }
};
