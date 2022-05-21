const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const validateBody = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
        message: 'Some required fields are missing',
       }); 
   }
   next();
};

const loginUser = async (req, res) => {
try {
  const { email, password } = req.body;
  
  const userInfo = await User.findOne({ where: { email } });
  
  if (!userInfo || userInfo.password !== password) {
  return res.status(400).json({ message: 'Invalid fields' }); 
  }
  const userValues = userInfo.dataValues; 
  
  const { password: passwordHolder, ...userRmPassword } = userValues;
  const token = jwt.sign(userRmPassword, JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token });
} catch (error) {
  return res.status(500).json({ token: 'lisho' });
} 
};

module.exports = {
  loginUser,
  validateBody,
};