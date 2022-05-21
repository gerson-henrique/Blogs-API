// const jwt = require('jsonwebtoken');
const { Category } = require('../models');

// const { JWT_SECRET } = process.env;

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const newCategory = await Category.create({ name });

    console.log(newCategory);
    const CategoryValues = newCategory.dataValues;
    return res.status(201).send(CategoryValues);
  } catch (error) {
    return res.status(500).json({ token: 'hmm q papelão hein' });
  } 
  };

 const getAllCategories = async (req, res) => {
   const allCategories = await Category.findAll();

   return res.status(200).send(allCategories);
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
  createCategory,
  getAllCategories,
};