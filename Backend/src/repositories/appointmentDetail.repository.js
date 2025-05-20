const db = require('../database/pg.database');

exports.getAllAppointmentDetails = async () => {
    try {
        const result = await db.query('SELECT * FROM appointment_details');
        return result.rows;
    } catch (error) {
        console.error('Error fetching appointment details', error);
    }
};

exports.createAppointmentDetail = async (detailObj) => {
    try {
        const result = await db.query(
            'INSERT INTO appointment_details (appointment_id, detail) VALUES ($1, $2) RETURNING *',
            [detailObj.appointment_id, detailObj.detail ?? ""]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating appointment detail', error);
        throw error;
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

exports.getAppointmentDetailByAppointmentId = async (appointmentId) => {
    try {
        const result = await db.query('SELECT * FROM appointment_details WHERE appointment_id = $1', [appointmentId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching appointment detail by appointment_id', error);
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


exports.deleteAppointmentDetailByAppointmentId = async (appointmentId) => {
    try {
        await db.query('DELETE FROM appointment_details WHERE appointment_id = $1', [appointmentId]);
    } catch (error) {
        console.error('Error deleting appointment detail by appointment_id', error);
    }
};