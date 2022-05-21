const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

 router.post('/', userControllers.validateBody, userControllers.loginUser);
 
module.exports = router;