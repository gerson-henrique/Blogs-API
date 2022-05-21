const { User } = require('../../models');

const validateLoginBody = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
        message: 'Some required fields are missing',
       }); 
   }
   next();
};

const validateUserBody = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  if (!email || !password || !displayName || !image) {
    return res.status(400).json({
        message: 'Some required fields are missing',
       }); 
   }
   next();
};

const validateUserFormat = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const rgx = /\S+@\S+\.\S+/;
  if (displayName.length < 8) {
 return res.status(400).json({
    message: '"displayName" length must be at least 8 characters long',
  });
}
  if (!rgx.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
 
 if (password.length < 6) {
    return res.status(400).json({
       message: '"password" length must be at least 6 characters long',
     });
}

next();
};

const searchByEmail = async (req, res, next) => {
const { email } = req.body;
const result = await User.findOne({ where: { email } });
if (result) return res.status(409).json({ message: 'User already registered' });
next(); 
};

module.exports = {
  validateLoginBody,
  validateUserBody,
  validateUserFormat,
  searchByEmail,
};