const doctorController = require('./../controllers/doctor.controller');
const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

router.get('/getAll', doctorController.getAllDoctors);
router.post('/create', upload.single('photo'), doctorController.createDoctor);
router.get('/user/:id', doctorController.getDoctorByUserId);
router.get('/:id', doctorController.getDoctorById);
router.put('', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);
router.post('/create', upload.single('photo'), doctorController.createDoctor);

module.exports = router;
