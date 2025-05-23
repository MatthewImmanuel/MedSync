const appointmentController = require('./../controllers/appointment.controller');
const express = require('express');
const router = express.Router();

router.get('/getAll', appointmentController.getAllAppointments);
router.post('/create', appointmentController.createAppointment);
router.get('/patient/:id', appointmentController.getAppointmentsByPatientId);
router.get('/doctor/:id', appointmentController.getAppointmentsByDoctorId);
router.get('/:id', appointmentController.getAppointmentById);
router.put('', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);
module.exports = router;
