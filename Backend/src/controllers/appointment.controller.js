const appointmentRepository = require('./../repositories/appointment.repository');
const appointmentDetailRepository = require('./../repositories/appointmentDetail.repository');
const baseResponse = require('../utils/baseResponse.util');

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
    try {
        const appointment = await appointmentRepository.createAppointment(req.body);
        await appointmentDetailRepository.createAppointmentDetail({
            appointment_id: appointment.id,
            detail: ""
        });
        baseResponse(res, true, 201, 'Appointment created', appointment);
    } catch (error) {
        console.error("CREATE APPOINTMENT ERROR:", error); // Tambahkan ini
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await appointmentRepository.getAppointmentById(req.params.id);
        if (!appointment) return baseResponse(res, false, 404, 'Appointment not found', null);
        baseResponse(res, true, 200, 'Appointment found', appointment);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointment', error);
    }
}

exports.getAppointmentsByDoctorId = async (req, res) => {
    try {
        const appointments = await appointmentRepository.getAppointmentsByDoctorId(req.params.id);
        if (!appointments || appointments.length === 0)
            return baseResponse(res, false, 404, 'No appointments found', null);
        baseResponse(res, true, 200, 'Appointments found', appointments);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointments', error);
    }
}

exports.updateAppointment = async (req, res) => {
    if (!req.body.id) return baseResponse(res, false, 400, 'Missing appointment id');
    try {
        const appointment = await appointmentRepository.updateAppointment(req.body);
        if (!appointment) return baseResponse(res, false, 404, 'Appointment not found', null);
        baseResponse(res, true, 200, 'Appointment updated', appointment);
    } catch (error) {
        baseResponse(res, false, 500, 'Error updating appointment', error);
    }
}

exports.deleteAppointment = async (req, res) => {
    try {
        await appointmentDetailRepository.deleteAppointmentDetailByAppointmentId(req.params.id);

        const appointment = await appointmentRepository.deleteAppointment(req.params.id);
        if (!appointment) return baseResponse(res, false, 404, 'Appointment not found', null);
        baseResponse(res, true, 200, 'Appointment deleted', appointment);
    } catch (error) {
        baseResponse(res, false, 500, 'Error deleting appointment', error);
    }
};

exports.getAppointmentsByPatientId = async (req, res) => {
    try {
        const appointments = await appointmentRepository.getAppointmentsByPatientId(req.params.id);
        if (!appointments || appointments.length === 0)
            return baseResponse(res, false, 404, 'No appointments found', null);
        baseResponse(res, true, 200, 'Appointments found', appointments);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointments', error);
    }
};

