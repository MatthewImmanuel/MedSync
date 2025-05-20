const appointmentDetailController = require('./../controllers/appointmentDetail.controller');
const express = require('express');
const router = express.Router();

router.get('/getAll', appointmentDetailController.getAllAppointmentDetails);
router.post('/create', appointmentDetailController.createAppointmentDetail);
router.get('/:id', appointmentDetailController.getAppointmentDetailById);
router.put('', appointmentDetailController.updateAppointmentDetail);
router.delete('/:id', appointmentDetailController.deleteAppointmentDetail);

module.exports = router;
