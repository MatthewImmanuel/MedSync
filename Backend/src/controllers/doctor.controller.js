const doctorRepository = require('./../repositories/doctor.repository');
const baseResponse = require('./../utils/baseResponse.util');

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorRepository.getAllDoctors();
        if (doctors.length === 0) return baseResponse(res, false, 404, 'No doctors found', null);
        baseResponse(res, true, 200, 'Doctors found', doctors);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving doctors', error);
    }
}

exports.createDoctor = async (req, res) => {
    try {
        const doctor = await doctorRepository.createDoctor(req.body);
        baseResponse(res, true, 201, 'Doctor created', doctor);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
}

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorRepository.getDoctorById(req.params.id);
        if (!doctor) return baseResponse(res, false, 404, 'Doctor not found', null);
        baseResponse(res, true, 200, 'Doctor found', doctor);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving doctor', error);
    }
}

exports.updateDoctor = async (req, res) => {
    if (!req.body.id) return baseResponse(res, false, 400, 'Missing doctor id');
    try {
        const doctor = await doctorRepository.updateDoctor(req.body);
        if (!doctor) return baseResponse(res, false, 404, 'Doctor not found', null);
        baseResponse(res, true, 200, 'Doctor updated', doctor);
    } catch (error) {
        baseResponse(res, false, 500, 'Error updating doctor', error);
    }
}

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await doctorRepository.deleteDoctor(req.params.id);
        if (!doctor) return baseResponse(res, false, 404, 'Doctor not found', null);
        baseResponse(res, true, 200, 'Doctor deleted', doctor);
    } catch (error) {
        baseResponse(res, false, 500, 'Error deleting doctor', error);
    }
}
