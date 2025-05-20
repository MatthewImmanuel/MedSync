const patientRepository = require('./../repositories/patient.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await patientRepository.getAllPatients();
        if (patients.length === 0) return baseResponse(res, false, 404, 'No patients found', null);
        baseResponse(res, true, 200, 'Patients found', patients);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving patients', error);
    }
}

exports.createPatient = async (req, res) => {
    if (!req.body.user_id, !req.body.name || !req.body.age || !req.body.address) {
        return baseResponse(res, false, 400, 'Missing patient data', null);
    }
    
    try {
        const patient = await patientRepository.createPatient(req.body);
        baseResponse(res, true, 201, 'Patient created', patient);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
}

exports.getPatientById = async (req, res) => {
    try {
        const patient = await patientRepository.getPatientById(req.params.id);
        if (!patient) return baseResponse(res, false, 404, 'Patient not found', null);
        baseResponse(res, true, 200, 'Patient found', patient);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving patient', error);
    }
}

exports.updatePatient = async (req, res) => {
    if (!req.body.id) return baseResponse(res, false, 400, 'Missing patient id');
    if (!req.body.user_id, !req.body.name || !req.body.age || !req.body.address) {
        return baseResponse(res, false, 400, 'Missing patient data', null);
    }
    try {
        const patient = await patientRepository.updatePatient(req.body);
        if (!patient) return baseResponse(res, false, 404, 'Patient not found', null);
        baseResponse(res, true, 200, 'Patient updated', patient);
    } catch (error) {
        baseResponse(res, false, 500, 'Error updating patient', error);
    }
}

exports.deletePatient = async (req, res) => {
    try {
        const patient = await patientRepository.deletePatient(req.params.id);
        if (!patient) return baseResponse(res, false, 404, 'Patient not found', null);
        baseResponse(res, true, 200, 'Patient deleted', patient);
    } catch (error) {
        baseResponse(res, false, 500, 'Error deleting patient', error);
    }
}
