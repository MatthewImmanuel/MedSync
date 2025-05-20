const userRepository = require('./../repositories/user.repository');
const baseResponse = require('./../utils/baseResponse.util');

exports.register = async (req, res) => {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!req.body.email || !regex.test(req.body.email)) {
        return baseResponse(res, false, 400, 'Invalid or missing email', null);
    }
    if (!req.body.password) {
        return baseResponse(res, false, 400, 'Missing password', null);
    }
    if (!req.body.name) {
        return baseResponse(res, false, 400, 'Missing name', null);
    }

    try {
        const user = await userRepository.register({ email: req.body.email, password: req.body.password, name: req.body.name });
        if (!user) {
            return baseResponse(res, false, 404, 'Email already used', null);
        }
        baseResponse(res, true, 201, 'User created', user);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
}

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return baseResponse(res, false, 400, 'Missing email or password');
    }
    try {
        const user = await userRepository.login({ email: req.body.email, password: req.body.password });
        if (!user) {
            return baseResponse(res, false, 404, 'Invalid email or password', null);
        }
        baseResponse(res, true, 200, 'Login success', user);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        if (users.length === 0) return baseResponse(res, false, 404, 'No users found', null);
        baseResponse(res, true, 200, 'Users found', users);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving users', error);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await userRepository.getUserById(req.params.id);
        if (!user) return baseResponse(res, false, 404, 'User not found', null);
        baseResponse(res, true, 200, 'User found', user);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving user', error);
    }
}

exports.updateUser = async (req, res) => {
    if (!req.body.id) return baseResponse(res, false, 400, 'Missing user id');
    try {
        const user = await userRepository.updateUser(req.body);
        if (!user) return baseResponse(res, false, 404, 'User not found', null);
        baseResponse(res, true, 200, 'User updated', user);
    } catch (error) {
        baseResponse(res, false, 500, 'Error updating user', error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await userRepository.deleteUser(req.params.id);
        if (!user) return baseResponse(res, false, 404, 'User not found', null);
        baseResponse(res, true, 200, 'User deleted', user);
    } catch (error) {
        baseResponse(res, false, 500, 'Error deleting user', error);
    }
}
