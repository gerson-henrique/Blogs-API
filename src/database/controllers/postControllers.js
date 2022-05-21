// const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory } = require('../models');

// const { JWT_SECRET } = process.env;

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { user } = req;
    // const newPost = await BlogPost.create({ title, content, categoryIds });

    // console.log(newCategory);
    // const CategoryValues = newCategory.dataValues;
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).json({ token: 'hmm q papelão hein' });
  } 
  };

//  const getById = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findOne({
//     where: { id },
//    attributes: {
//        exclude: ['password'],
//    },
// });
// return res.status(200).send(user);
//  };

module.exports = {
  createPost,
};