// const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const { Op } = Sequelize;

// const { JWT_SECRET } = process.env;

const createPost = async (req, res) => {
  try {
  const { title, content, categoryIds } = req.body;
  const idAuthor = req.user.id;
  console.log(idAuthor);
   const newPost = await BlogPost.create({ title,
     content,
userId: idAuthor,
published: Date.now(),
updated: Date.now() });
const npid = newPost.dataValues.id;
categoryIds.forEach(async (e) => {
  PostCategory.create({ postId: npid, categoryId: e });
});
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ token: 'hmm q papelão hein' });
  } 
  };

  const getAllPosts = async (req, res) => {
    const allPosts = await BlogPost.findAll({
       include: [{ 
        model: User, as: 'user', attributes: { exclude: ['password'] },
      }, {
        model: Category, as: 'categories', through: { attributes: [] },
       }],
});

    res.status(200).send(allPosts);
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({
           message: 'Post does not exist',
         }); 
     }
    const user = await post.getUser();
    const categories = await post.getCategories();

    delete user.dataValues.password;
    categories.forEach((e) => delete e.dataValues.PostCategory);
    res.status(200).send({ ...post.dataValues, user, categories });
  };

  const updatePost = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    if (!title || !content) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    }); 
  }
  await BlogPost.update({ title, content, updated: sequelize.fn('NOW') },
  { where: { id } });
  const post = await BlogPost.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' }); 
   }
  const user = await post.getUser();
         const categories = await post.getCategories();
         delete user.dataValues.password;
         categories.forEach((e) => delete e.dataValues.PostCategory);
         res.status(200).send({ ...post.dataValues, user, categories });
  };

  const deleteById = async (req, res) => {
  const { id } = req.params;
  await BlogPost.destroy({ where: { id } });
   await PostCategory.destroy({ where: { postId: id } });
   res.status(204).end();
  };

  const findByQ = async (req, res) => {
    const { q } = req.query;
    const title = await BlogPost.findAll({ include: [{ 
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, { model: Category, as: 'categories', through: { attributes: [] } }],
where: { title: { [Op.like]: `%${q}%` } } });
    console.log(title);
    if (title.length > 0) return res.status(200).send(title); 
    const content = await BlogPost.findAll({ include: [{ 
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, { model: Category, as: 'categories', through: { attributes: [] } }],
where: { content: { [sequelize.like]: q } } });
    if (content.length > 0) return res.status(200).send(content); 
    const all = await BlogPost.findAll({ include: [{ 
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, {
      model: Category, as: 'categories', through: { attributes: [] },
     }] });
    res.status(500).send(all);
  };

module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePost,
  deleteById,
  findByQ,
};