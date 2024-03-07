const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/userModel.js');

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find({}).sort({createdAt: -1});
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted successfully', user });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = await User.findById(id);
        const newUser = await user.updateOne({
            id: id,
            username: username || user.username,
            email: email || user.email,
            password: password? await bcrypt.hash(password, 10) : user.password
        }, { new: true });

        res.status(200).json({ message: 'User updated successfully' });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

const addAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = await User.findById(id);
        const newUser = await user.updateOne({
            id: id,
            isAdmin: true
        }, { new: true });
        res.status(200).json({ message: 'Admin role added successfully' })
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
};

const removeAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = await User.findById(id);
        const newUser = await user.updateOne({
            id: id,
            isAdmin: false
        }, { new: true });
        res.status(200).json({ message: 'Admin role remove successfully' })
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    addAdmin,
    removeAdmin
};