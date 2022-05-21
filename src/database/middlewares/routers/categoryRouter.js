const express = require('express');
const categoriesController = require('../../controllers/categoriesController');
const userValidations = require('../validations/userValidations');
// const categoryValidations = require('../validations/categoryValidations');

const router = express.Router();

 router.post('/', userValidations.auth, categoriesController.createCategory);
 
module.exports = router;