require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authenticationRoutes = require('./routes/authenticationRoutes.js');
const userRoutes = require('./routes/userRoutes.js')

const app = express();

// Middleware configuration
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to MongoDB!'))
.catch(error =>
    console.error('An Error occurred while connecting to MongoDB:', error)
    );

// Routing
app.use('/user', authenticationRoutes);
app.use('/user', userRoutes);

// Server startup
app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});
