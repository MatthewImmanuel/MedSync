const db = require('../database/pg.database');

exports.getAllAppointmentDetails = async () => {
    try {
        const result = await db.query('SELECT * FROM appointment_details');
        return result.rows;
    } catch (error) {
        console.error('Error fetching appointment details', error);
    }
};

exports.createAppointmentDetail = async (appointmentDetail) => {
    try {
        const result = await db.query(
            'INSERT INTO appointment_details (appointment_id, detail) VALUES ($1, $2) RETURNING *',
            [appointmentDetail.appointment_id, appointmentDetail.detail]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating appointment detail', error);
    }
};

exports.getAppointmentDetailById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM appointment_details WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching appointment detail by ID', error);
    }
};

exports.updateAppointmentDetail = async (appointmentDetail) => {
    try {
        const result = await db.query(
            'UPDATE appointment_details SET appointment_id = $1, detail = $2 WHERE id = $3 RETURNING *',
            [appointmentDetail.appointment_id, appointmentDetail.detail, appointmentDetail.id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating appointment detail', error);
    }
};

exports.deleteAppointmentDetail = async (id) => {
    try {
        const appointmentDetail = await db.query('SELECT * FROM appointment_details WHERE id = $1', [id]);
        await db.query('DELETE FROM appointment_details WHERE id = $1', [id]);
        return appointmentDetail.rows[0];
    } catch (error) {
        console.error('Error deleting appointment detail', error);
    }
};
