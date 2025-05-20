const hospitalRepository = require('./../repositories/hospital.repository');
const baseResponse = require('./../utils/baseResponse.util');

exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await hospitalRepository.getAllHospitals();
        if (hospitals.length === 0) return baseResponse(res, false, 404, 'No hospitals found', null);
        baseResponse(res, true, 200, 'Hospitals found', hospitals);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving hospitals', error);
    }
}

exports.createHospital = async (req, res) => {
    if (!req.body.name) {
        return baseResponse(res, false, 400, 'Missing name', null);
    }
    if (!req.body.address) {
        return baseResponse(res, false, 400, 'Missing address', null);
    }

    try {
        const hospital = await hospitalRepository.createHospital(req.body);
        baseResponse(res, true, 201, 'Hospital created', hospital);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
}

exports.getHospitalById = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }

    try {
        const hospital = await hospitalRepository.getHospitalById(req.params.id);
        if (!hospital) return baseResponse(res, false, 404, 'Hospital not found', null);
        baseResponse(res, true, 200, 'Hospital found', hospital);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving hospital', error);
    }
}

exports.updateHospital = async (req, res) => {
    if (!req.body.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }
    if (!req.body.name) {
        return baseResponse(res, false, 400, 'Missing name', null);
    }
    if (!req.body.address) {
        return baseResponse(res, false, 400, 'Missing address', null);
    }

    try {
        const hospital = await hospitalRepository.updateHospital(req.body);
        if (!hospital) return baseResponse(res, false, 404, 'Hospital not found', null);
        baseResponse(res, true, 200, 'Hospital updated', hospital);
    } catch (error) {
        baseResponse(res, false, 500, 'Error updating hospital', error);
    }
}

exports.deleteHospital = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(res, false, 400, 'Missing id');
    }

    try {
        const hospital = await hospitalRepository.deleteHospital(req.params.id);
        if (!hospital) return baseResponse(res, false, 404, 'Hospital not found', null);
        baseResponse(res, true, 200, 'Hospital deleted', hospital);
    } catch (error) {
        baseResponse(res, false, 500, 'Error deleting hospital', error);
    }
}
