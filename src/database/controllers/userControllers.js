const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

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

// const validateUserFormat = (req, res, next) => {
//   const { display, email, password, image } = req.body;
//   if (display.length < 8) {
//  return res.status(400).message({
//     message: '"displayName" length must be at least 8 characters long',
//   }); 
// }


// };

// const createUser = async (req, res) => {
//   try {
//     const { display, email, password, image } = req.body;

//     const userInfo = await User.findOne({ where: { email } });
    
//     if (!userInfo || userInfo.password !== password) {
//     return res.status(400).json({ message: 'Invalid fields' }); 
//     }
//     const userValues = userInfo.dataValues; 
    
//     const { password: passwordHolder, ...userRmPassword } = userValues;
//     const token = jwt.sign(userRmPassword, JWT_SECRET, { expiresIn: '1h' });
//     return res.status(200).json({ token });
//   } catch (error) {
//     return res.status(500).json({ token: 'lisho' });
//   } 
//   };

module.exports = {
  loginUser,
};