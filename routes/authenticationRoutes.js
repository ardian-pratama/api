const express = require('express');
const authenticationRoutes = express.Router();
const { signUp, signIn, getAllUsers } = require('../controllers/authenticationController.js');

authenticationRoutes.post('/sign-up', signUp);
authenticationRoutes.post('/sign-in', signIn);

module.exports = authenticationRoutes;
