const patientController = require('./../controllers/patient.controller');
const express = require('express');
const router = express.Router();

router.get('/getAll', patientController.getAllPatients);
router.post('/create', patientController.createPatient);
router.get('/user/:userId', patientController.getPatientByUserId);
router.get('/:id', patientController.getPatientById);
router.put('', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;
