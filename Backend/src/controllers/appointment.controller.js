const appointmentRepository = require('./../repositories/appointment.repository');
const baseResponse = require('./../utils/baseResponse.util');

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentRepository.getAllAppointments();
        if (appointments.length === 0) return baseResponse(res, false, 404, 'No appointments found', null);
        baseResponse(res, true, 200, 'Appointments found', appointments);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointments', error);
    }
}

exports.createAppointment = async (req, res) => {
    if (!req.body.appointment_date) {
        return baseResponse(res, false, 400, 'Missing appointment date');
    }
    if (!req.body.start_time) {
        return baseResponse(res, false, 400, 'Missing start time', null);
    }
    if (!req.body.end_time) {
        return baseResponse(res, false, 400, 'Missing end time', null);
    }
    if (!req.body.doctor_id) {
        return baseResponse(res, false, 400, 'Missing doctor id', null);
    }
    if (!req.body.patient_id) {
        return baseResponse(res, false, 400, 'Missing patient id', null);
    }
    if (!req.body.hospital_id) {
        return baseResponse(res, false, 400, 'Missing hospital id', null);
    }

    try {
        const appointment = await appointmentRepository.createAppointment(req.body);
        baseResponse(res, true, 201, 'Appointment created', appointment);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
}

exports.getAppointmentById = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }

    try {
        const appointment = await appointmentRepository.getAppointmentById(req.params.id);
        if (!appointment) return baseResponse(res, false, 404, 'Appointment not found', null);
        baseResponse(res, true, 200, 'Appointment found', appointment);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointment', error);
    }
}

exports.updateAppointment = async (req, res) => {
    if (!req.body.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }
    if (!req.body.appointment_date) {
        return baseResponse(res, false, 400, 'Missing appointment date');
    }
    if (!req.body.start_time) {
        return baseResponse(res, false, 400, 'Missing start time', null);
    }
    if (!req.body.end_time) {
        return baseResponse(res, false, 400, 'Missing end time', null);
    }
    if (!req.body.doctor_id) {
        return baseResponse(res, false, 400, 'Missing doctor id', null);
    }
    if (!req.body.patient_id) {
        return baseResponse(res, false, 400, 'Missing patient id', null);
    }
    if (!req.body.hospital_id) {
        return baseResponse(res, false, 400, 'Missing hospital id', null);
    }
    
    try {
        const appointment = await appointmentRepository.updateAppointment(req.body);
        if (!appointment) return baseResponse(res, false, 404, 'Appointment not found', null);
        baseResponse(res, true, 200, 'Appointment updated', appointment);
    } catch (error) {
        baseResponse(res, false, 500, 'Error updating appointment', error);
    }
}

exports.deleteAppointment = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }
    
    try {
        const appointment = await appointmentRepository.deleteAppointment(req.params.id);
        if (!appointment) return baseResponse(res, false, 404, 'Appointment not found', null);
        baseResponse(res, true, 200, 'Appointment deleted', appointment);
    } catch (error) {
        baseResponse(res, false, 500, 'Error deleting appointment', error);
    }
}
