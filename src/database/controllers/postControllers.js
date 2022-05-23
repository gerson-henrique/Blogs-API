// const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, User, Category } = require('../models');

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

module.exports = {
  createPost,
  getAllPosts,
  getById,
};