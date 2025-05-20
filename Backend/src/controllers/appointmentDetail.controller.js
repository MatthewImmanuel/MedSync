const appointmentDetailRepository = require('./../repositories/appointmentDetail.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllAppointmentDetails = async (req, res) => {
    try {
        const details = await appointmentDetailRepository.getAllAppointmentDetails();
        if (details.length === 0) return baseResponse(res, false, 404, 'No appointment details found', null);
        baseResponse(res, true, 200, 'Appointment details found', details);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointment details', error);
    }
};

exports.createAppointmentDetail = async (req, res) => {
    if (!req.body.appointment_id) {
        return baseResponse(res, false, 400, 'Missing appointment id', null);
    }
    if (!req.body.detail) {
        return baseResponse(res, false, 400, 'Missing detail', null);
    }

    try {
        const detail = await appointmentDetailRepository.createAppointmentDetail(req.body);
        baseResponse(res, true, 201, 'Appointment detail created', detail);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
};

exports.getAppointmentDetailById = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }

    try {
        const detail = await appointmentDetailRepository.getAppointmentDetailById(req.params.id);
        if (!detail) return baseResponse(res, false, 404, 'Appointment detail not found', null);
        baseResponse(res, true, 200, 'Appointment detail found', detail);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointment detail', error);
    }
};

exports.updateAppointmentDetail = async (req, res) => {
    if (!req.body.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }
    if (!req.body.appointment_id) {
        return baseResponse(res, false, 400, 'Missing appointment id', null);
    }
    if (!req.body.detail) {
        return baseResponse(res, false, 400, 'Missing detail', null);
    }
    
    if (!req.body.id) return baseResponse(res, false, 400, 'Missing appointment detail id', null);
    try {
        const detail = await appointmentDetailRepository.updateAppointmentDetail(req.body);
        if (!detail) return baseResponse(res, false, 404, 'Appointment detail not found', null);
        baseResponse(res, true, 200, 'Appointment detail updated', detail);
    } catch (error) {
        baseResponse(res, false, 500, 'Error updating appointment detail', error);
    }
};

exports.deleteAppointmentDetail = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }
    
    try {
        const detail = await appointmentDetailRepository.deleteAppointmentDetail(req.params.id);
        if (!detail) return baseResponse(res, false, 404, 'Appointment detail not found', null);
        baseResponse(res, true, 200, 'Appointment detail deleted', detail);
    } catch (error) {
        baseResponse(res, false, 500, 'Error deleting appointment detail', error);
    }
};
