const userController = require('./../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.get('/getAll', userController.getAllUsers);
router.post('/create', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
