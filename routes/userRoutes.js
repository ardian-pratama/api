const express = require('express');
const userRoutes = express.Router();
const { getAllUsers, deleteUser, updateUser, addAdmin, removeAdmin} = require('../controllers/userController.js')

userRoutes.get('/', getAllUsers);
userRoutes.delete('/delete/:id', deleteUser);
userRoutes.put('/update/:id', updateUser);
userRoutes.put('/add-admin/:id', addAdmin);
userRoutes.put('/remove-admin/:id', removeAdmin);

module.exports = userRoutes;