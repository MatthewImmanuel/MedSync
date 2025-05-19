const userRepository = require('./../repositories/user.repository');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        if (users.length === 0) return baseResponse(res, false, 404, 'No users found', null);
        baseResponse(res, true, 200, 'Users found', users);
    } catch (error) {
        baseResponse(res, false, 500, 'Error retrieving users', error);
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await userRepository.createUser(req.body);
        baseResponse(res, true, 201, 'User created', user);
    } catch (error) {
        baseResponse(res, false, 500, error.message || 'Server error', error);
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
