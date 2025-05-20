const cloudinary = require('../utils/cloudinary');
const doctorRepository = require('./../repositories/doctor.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorRepository.getAllDoctors();
        if (doctors.length === 0) return baseResponse(res, false, 404, 'No doctors found', null);
        baseResponse(res, true, 200, 'Doctors found', doctors);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving doctors', error);
    }
}
exports.getDoctorByUserId = async (req, res) => {
    try {
        const doctor = await doctorRepository.getDoctorByUserId(req.params.id);
        if (!doctor) return baseResponse(res, false, 404, 'Doctor not found', null);
        baseResponse(res, true, 200, 'Doctor found', doctor);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving doctor', error);
    }
}

exports.createDoctor = async (req, res) => {
  try {
    const doctorData = req.body;
    if (req.file) {
      // Upload buffer ke Cloudinary
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: 'medsync_doctors' },
        async (error, result) => {
          if (error) {
            return baseResponse(res, false, 500, 'Cloudinary upload error', error);
          }
          doctorData.photo_url = result.secure_url;
          const doctor = await doctorRepository.createDoctor(doctorData);
          return baseResponse(res, true, 201, 'Doctor created', doctor);
        }
      );
      uploadResult.end(req.file.buffer);
    } else {
      const doctor = await doctorRepository.createDoctor(doctorData);
      baseResponse(res, true, 201, 'Doctor created', doctor);
    }
  } catch (error) {
    baseResponse(res, false, 500, error.message || 'Server error', error);
  }
};

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
