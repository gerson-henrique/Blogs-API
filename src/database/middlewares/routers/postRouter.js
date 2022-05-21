const express = require('express');
const postControllers = require('../../controllers/postControllers');
const userValidations = require('../validations/userValidations');
const postValidations = require('../validations/postValidations');

const router = express.Router();

 router.post('/', 
 userValidations.auth,
 postValidations.validatePostBody,
 postValidations.idCategoryCheck,
 postControllers.createPost);
// router.get('/', userValidations.auth, postControllers.getAllPosts);
 
module.exports = router;