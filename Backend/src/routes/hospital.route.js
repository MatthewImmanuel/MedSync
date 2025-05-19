const hospitalController = require('./../controllers/hospital.controller');
const express = require('express');
const router = express.Router();

router.get('/getAll', hospitalController.getAllHospitals);
router.post('/create', hospitalController.createHospital);
router.get('/:id', hospitalController.getHospitalById);
router.put('', hospitalController.updateHospital);
router.delete('/:id', hospitalController.deleteHospital);

module.exports = router;
