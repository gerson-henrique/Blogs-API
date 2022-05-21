const express = require('express');
const userControllers = require('../../controllers/userControllers');
const userValidations = require('../validations/userValidations');

const router = express.Router();

 router.post('/', userValidations.validateLoginBody, userControllers.loginUser);
 
module.exports = router;