const doctorController = require('./../controllers/doctor.controller');
const express = require('express');
const router = express.Router();

router.get('/getAll', doctorController.getAllDoctors);
router.post('/create', doctorController.createDoctor);
router.get('/:id', doctorController.getDoctorById);
router.put('', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
