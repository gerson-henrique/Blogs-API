const express = require('express');
const userControllers = require('../../controllers/userControllers');
const userValidations = require('../validations/userValidations');

const router = express.Router();
router.get('/', userValidations.auth, userControllers.getAllUsers);
router.get('/:id',
userValidations.auth,
userValidations.idUserCheck,
userControllers.getById);
 router.post('/', userValidations.validateUserBody,
 userValidations.validateUserFormat,
 userValidations.searchByEmail,
 userControllers.createUser);
 
module.exports = router;