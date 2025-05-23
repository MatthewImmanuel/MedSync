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
        return baseResponse(res, false, 400, 'Missing appointment_id', null);
    }
    const detail = req.body.detail !== undefined ? req.body.detail : "";
    try {
        const detailObj = {
            appointment_id: req.body.appointment_id,
            detail: detail
        };
        const detailResult =     await appointmentDetailRepository.createAppointmentDetail(detailObj);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
};

exports.getAppointmentDetailById = async (req, res) => {
    try {
        const detail = await appointmentDetailRepository.getAppointmentDetailById(req.params.id);
        if (!detail) return baseResponse(res, false, 404, 'Appointment detail not found', null);
        baseResponse(res, true, 200, 'Appointment detail found', detail);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointment detail', error);
    }
};

exports.getAppointmentDetailByAppointmentId = async (req, res) => {
    try {
        const detail = await appointmentDetailRepository.getAppointmentDetailByAppointmentId(req.params.appointmentId);
        if (!detail) return baseResponse(res, false, 404, 'Appointment detail not found', null);
        baseResponse(res, true, 200, 'Appointment detail found', detail);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving appointment detail', error);
    }
};

exports.updateAppointmentDetail = async (req, res) => {
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
    try {
        const detail = await appointmentDetailRepository.deleteAppointmentDetail(req.params.id);
        if (!detail) return baseResponse(res, false, 404, 'Appointment detail not found', null);
        baseResponse(res, true, 200, 'Appointment detail deleted', detail);
    } catch (error) {
        baseResponse(res, false, 500, 'Error deleting appointment detail', error);
    }
};
