const express = require('express');
const postControllers = require('../../controllers/postControllers');
const userValidations = require('../validations/userValidations');
const postValidations = require('../validations/postValidations');

const router = express.Router();

 router.get('/', userValidations.auth, postControllers.getAllPosts);
 router.get('/:id', userValidations.auth, postControllers.getById);
 router.post('/', 
 userValidations.auth,
 postValidations.validatePostBody,
 postValidations.idCategoryCheck,
 postControllers.createPost);
 
module.exports = router;