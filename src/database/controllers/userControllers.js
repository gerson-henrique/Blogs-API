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
  return res.status(500).json({ token: 'we working on it, WE WORKING ON IT' });
} 
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await User.create({
      displayName,
      email,
      password,
      image,

    });

    console.log(newUser);
    const { password: passwordHolder, ...userRmPassword } = newUser.dataValues;
    const token = jwt.sign(userRmPassword, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ token: 'hmm q papelão hein' });
  } 
  };

 const getAllUsers = async (req, res) => {
   const allUser = await User.findAll({
    attributes: {
        exclude: ['password'],
    },
});

   return res.status(200).send(allUser);
 };

 const getById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
   attributes: {
       exclude: ['password'],
   },
});
return res.status(200).send(user);
 };

module.exports = {
  loginUser,
  createUser,
  getAllUsers,
  getById,
};