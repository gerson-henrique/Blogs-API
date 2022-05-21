const express = require('express');
const categoriesController = require('../../controllers/categoriesController');
const userValidations = require('../validations/userValidations');

const router = express.Router();

 router.post('/', userValidations.auth, categoriesController.createCategory);
 router.get('/', userValidations.auth, categoriesController.getAllCategories);
 
module.exports = router;