const userController = require('./../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getAll', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
